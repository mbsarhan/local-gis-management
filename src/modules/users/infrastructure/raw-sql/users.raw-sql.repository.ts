import { Injectable } from '@nestjs/common';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';
import { IUsersRepository } from '../../domain/repositories/users.repository.interface';

@Injectable()
export class UsersRawSqlRepository implements IUsersRepository {

    constructor(private readonly pgPool: PgPoolService) {}

    async login(username: string, password: string) {
        const rows = await this.pgPool.callFunction('public.login', [username, password]);
        return rows[0] ?? null;
    }

    async findAll(token: string) {
        return this.pgPool.callFunction('public.get_all_users', [token]);
    }

    async addUser(idWho: number, name: string, username: string, password: string, idUserType: number, idGroup?: number) {
        return this.pgPool.callFunctionScalar('public.add_user', [idWho, name, username, password, idUserType, idGroup ?? null]);
    }

    async deactivateUser(idWho: number, idUser: number) {
        return this.pgPool.callFunctionScalar('public.deactivate_user', [idWho, idUser]);
    }

    async reactivateUser(idWho: number, idUser: number) {
        return this.pgPool.callFunctionScalar('public.reactivate_user', [idWho, idUser]);
    }

    async changePassword(idWho: number, idUser: number, newPassword: string) {
        return this.pgPool.callFunctionScalar('public.change_user_password', [idWho, idUser, newPassword]);
    }

    async changeUserType(idWho: number, idUser: number, idUserType: number) {
        return this.pgPool.callFunctionScalar('public.change_user_type', [idWho, idUser, idUserType]);
    }

    async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
        await this.pgPool.query(
            'UPDATE users SET refresh_token = $1 WHERE id = $2',
            [refreshToken, userId]
        );
    }

    async getRefreshToken(userId: number): Promise<string | null> {
        const rows = await this.pgPool.query(
            'SELECT refresh_token FROM users WHERE id = $1',
            [userId]
        );
        return rows[0]?.refresh_token ?? null;
    }

    async clearRefreshToken(userId: number): Promise<void> {
        await this.pgPool.query(
            'UPDATE users SET refresh_token = NULL WHERE id = $1',
            [userId]
        );
    }
}