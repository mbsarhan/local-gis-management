import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma.service';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';
import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
import * as crypto from 'crypto';

@Injectable()
export class UsersPrismaRepository implements IUsersRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly pgPool: PgPoolService,
    ) {}

    // ── Auth ──────────────────────────────────────────────────────────────

    async login(username: string, password: string) {
        const hashedPassword = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');

        const user = await this.prisma.user.findFirst({
            where:   { username, password: hashedPassword, isactive: true },
            include: { userType: true },
        });

        if (!user) return null;

        return {
            u_id:          user.id,
            u_name:        user.name,
            u_token:       user.token,
            u_id_user_type: user.id_user_type,
            name_user_type: user.userType?.name,
        };
    }

    // ── Read ──────────────────────────────────────────────────────────────

    async findAll(token: string) {
        // get_all_users has complex group-based access logic — keep as raw SQL
        return this.pgPool.callFunction('public.get_all_users', [token]);
    }

    // ── Create ────────────────────────────────────────────────────────────

    async addUser(
        idWho: number,
        name: string,
        username: string,
        password: string,
        idUserType: number,
        idGroup?: number,
    ): Promise<number> {
        // Validate user type exists
        const userTypeExists = await this.prisma.userType.findUnique({
            where: { id: idUserType },
        });
        if (!userTypeExists) {
            throw new BadRequestException('User type not found');
        }

        const hashedPassword = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');

        // 1. Insert the user row via Prisma
        const user = await this.prisma.user.create({
            data: {
                name,
                username,
                password: hashedPassword,
                isactive:     true,
                id_user_type: idUserType,
                id_group:     idGroup ?? null,
                id_who:       idWho,
                date:         new Date(),
            },
        });

        // 2. Create the actual PostgreSQL DB role — must stay as raw SQL
        await this.pgPool.query(
            `CREATE ROLE ${this.pgPool.quoteIdentifier(username)} WITH LOGIN PASSWORD ${this.pgPool.quoteLiteral(password)}`,
            []
        );

        return user.id;
    }

    // ── Deactivate ────────────────────────────────────────────────────────

    async deactivateUser(idWho: number, idUser: number): Promise<number> {
        if (idWho === idUser) {
            throw new BadRequestException('You cannot deactivate your own account');
        }

        const user = await this.prisma.user.findFirst({
            where: { id: idUser, isactive: true },
        });
        if (!user) {
            throw new NotFoundException('User not found or already inactive');
        }

        // 1. Update isactive via Prisma
        await this.prisma.user.update({
            where: { id: idUser },
            data:  { isactive: false },
        });

        // 2. Revoke DB login — must stay as raw SQL
        await this.pgPool.query(
            `ALTER ROLE ${this.pgPool.quoteIdentifier(user.username)} NOLOGIN`,
            []
        );

        return idUser;
    }

    // ── Reactivate ────────────────────────────────────────────────────────

    async reactivateUser(idWho: number, idUser: number): Promise<number> {
        if (idWho === idUser) {
            throw new BadRequestException('You cannot reactivate your own account');
        }

        const user = await this.prisma.user.findFirst({
            where: { id: idUser, isactive: false },
        });
        if (!user) {
            throw new NotFoundException('User not found or already active');
        }

        // 1. Update isactive via Prisma
        await this.prisma.user.update({
            where: { id: idUser },
            data:  { isactive: true },
        });

        // 2. Restore DB login — must stay as raw SQL
        await this.pgPool.query(
            `ALTER ROLE ${this.pgPool.quoteIdentifier(user.username)} LOGIN`,
            []
        );

        return idUser;
    }

    // ── Change Password ───────────────────────────────────────────────────

    async changePassword(idWho: number, idUser: number, newPassword: string): Promise<number> {
        if (idWho === idUser) {
            throw new BadRequestException('You cannot change your own password through this function');
        }

        const user = await this.prisma.user.findFirst({
            where: { id: idUser, isactive: true },
        });
        if (!user) {
            throw new NotFoundException('User not found or inactive');
        }

        const hashedPassword = crypto
            .createHash('md5')
            .update(newPassword)
            .digest('hex');

        // 1. Update password in users table via Prisma
        await this.prisma.user.update({
            where: { id: idUser },
            data:  { password: hashedPassword },
        });

        // 2. Update DB role password — must stay as raw SQL
        await this.pgPool.query(
            `ALTER ROLE ${this.pgPool.quoteIdentifier(user.username)} WITH PASSWORD ${this.pgPool.quoteLiteral(newPassword)}`,
            []
        );

        return idUser;
    }

    // ── Change User Type ──────────────────────────────────────────────────

    async changeUserType(idWho: number, idUser: number, idUserType: number): Promise<number> {
        if (idWho === idUser) {
            throw new BadRequestException('You cannot change your own user type');
        }

        const user = await this.prisma.user.findFirst({
            where: { id: idUser, isactive: true },
        });
        if (!user) {
            throw new NotFoundException('User not found or inactive');
        }

        const userTypeExists = await this.prisma.userType.findUnique({
            where: { id: idUserType },
        });
        if (!userTypeExists) {
            throw new BadRequestException('User type not found');
        }

        // Pure Prisma — no DDL needed
        await this.prisma.user.update({
            where: { id: idUser },
            data:  { id_user_type: idUserType },
        });

        return idUser;
    }

    // ── Refresh Token ─────────────────────────────────────────────────────

    async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
        await this.prisma.user.update({
            where: { id: userId },
            data:  { refresh_token: refreshToken },
        });
    }

    async getRefreshToken(userId: number): Promise<string | null> {
        const user = await this.prisma.user.findUnique({
            where:  { id: userId },
            select: { refresh_token: true },
        });
        return user?.refresh_token ?? null;
    }

    async clearRefreshToken(userId: number): Promise<void> {
        await this.prisma.user.update({
            where: { id: userId },
            data:  { refresh_token: null },
        });
    }
}