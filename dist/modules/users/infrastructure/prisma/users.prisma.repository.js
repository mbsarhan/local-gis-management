"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../shared/database/prisma.service");
const pg_pool_service_1 = require("../../../../shared/database/pg-pool.service");
const crypto = require("crypto");
let UsersPrismaRepository = class UsersPrismaRepository {
    constructor(prisma, pgPool) {
        this.prisma = prisma;
        this.pgPool = pgPool;
    }
    async login(username, password) {
        const hashedPassword = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');
        const user = await this.prisma.user.findFirst({
            where: { username, password: hashedPassword, isactive: true },
            include: { userType: true },
        });
        if (!user)
            return null;
        return {
            u_id: user.id,
            u_name: user.name,
            u_token: user.token,
            u_id_user_type: user.id_user_type,
            name_user_type: user.userType?.name,
        };
    }
    async findAll(token) {
        return this.pgPool.callFunction('public.get_all_users', [token]);
    }
    async addUser(idWho, name, username, password, idUserType, idGroup) {
        const userTypeExists = await this.prisma.userType.findUnique({
            where: { id: idUserType },
        });
        if (!userTypeExists) {
            throw new common_1.BadRequestException('User type not found');
        }
        const hashedPassword = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');
        const user = await this.prisma.user.create({
            data: {
                name,
                username,
                password: hashedPassword,
                isactive: true,
                id_user_type: idUserType,
                id_group: idGroup ?? null,
                id_who: idWho,
                date: new Date(),
            },
        });
        await this.pgPool.query(`CREATE ROLE ${this.pgPool.quoteIdentifier(username)} WITH LOGIN PASSWORD ${this.pgPool.quoteLiteral(password)}`, []);
        return user.id;
    }
    async deactivateUser(idWho, idUser) {
        if (idWho === idUser) {
            throw new common_1.BadRequestException('You cannot deactivate your own account');
        }
        const user = await this.prisma.user.findFirst({
            where: { id: idUser, isactive: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found or already inactive');
        }
        await this.prisma.user.update({
            where: { id: idUser },
            data: { isactive: false },
        });
        await this.pgPool.query(`ALTER ROLE ${this.pgPool.quoteIdentifier(user.username)} NOLOGIN`, []);
        return idUser;
    }
    async reactivateUser(idWho, idUser) {
        if (idWho === idUser) {
            throw new common_1.BadRequestException('You cannot reactivate your own account');
        }
        const user = await this.prisma.user.findFirst({
            where: { id: idUser, isactive: false },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found or already active');
        }
        await this.prisma.user.update({
            where: { id: idUser },
            data: { isactive: true },
        });
        await this.pgPool.query(`ALTER ROLE ${this.pgPool.quoteIdentifier(user.username)} LOGIN`, []);
        return idUser;
    }
    async changePassword(idWho, idUser, newPassword) {
        if (idWho === idUser) {
            throw new common_1.BadRequestException('You cannot change your own password through this function');
        }
        const user = await this.prisma.user.findFirst({
            where: { id: idUser, isactive: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found or inactive');
        }
        const hashedPassword = crypto
            .createHash('md5')
            .update(newPassword)
            .digest('hex');
        await this.prisma.user.update({
            where: { id: idUser },
            data: { password: hashedPassword },
        });
        await this.pgPool.query(`ALTER ROLE ${this.pgPool.quoteIdentifier(user.username)} WITH PASSWORD ${this.pgPool.quoteLiteral(newPassword)}`, []);
        return idUser;
    }
    async changeUserType(idWho, idUser, idUserType) {
        if (idWho === idUser) {
            throw new common_1.BadRequestException('You cannot change your own user type');
        }
        const user = await this.prisma.user.findFirst({
            where: { id: idUser, isactive: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found or inactive');
        }
        const userTypeExists = await this.prisma.userType.findUnique({
            where: { id: idUserType },
        });
        if (!userTypeExists) {
            throw new common_1.BadRequestException('User type not found');
        }
        await this.prisma.user.update({
            where: { id: idUser },
            data: { id_user_type: idUserType },
        });
        return idUser;
    }
    async saveRefreshToken(userId, refreshToken) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refresh_token: refreshToken },
        });
    }
    async getRefreshToken(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { refresh_token: true },
        });
        return user?.refresh_token ?? null;
    }
    async clearRefreshToken(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refresh_token: null },
        });
    }
};
exports.UsersPrismaRepository = UsersPrismaRepository;
exports.UsersPrismaRepository = UsersPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pg_pool_service_1.PgPoolService])
], UsersPrismaRepository);
//# sourceMappingURL=users.prisma.repository.js.map