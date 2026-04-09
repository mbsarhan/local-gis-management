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
exports.UsersRawSqlRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_pool_service_1 = require("../../../../shared/database/pg-pool.service");
let UsersRawSqlRepository = class UsersRawSqlRepository {
    constructor(pgPool) {
        this.pgPool = pgPool;
    }
    async login(username, password) {
        const rows = await this.pgPool.callFunction('public.login', [username, password]);
        return rows[0] ?? null;
    }
    async findAll(token) {
        return this.pgPool.callFunction('public.get_all_users', [token]);
    }
    async addUser(idWho, name, username, password, idUserType, idGroup) {
        return this.pgPool.callFunctionScalar('public.add_user', [idWho, name, username, password, idUserType, idGroup ?? null]);
    }
    async deactivateUser(idWho, idUser) {
        return this.pgPool.callFunctionScalar('public.deactivate_user', [idWho, idUser]);
    }
    async reactivateUser(idWho, idUser) {
        return this.pgPool.callFunctionScalar('public.reactivate_user', [idWho, idUser]);
    }
    async changePassword(idWho, idUser, newPassword) {
        return this.pgPool.callFunctionScalar('public.change_user_password', [idWho, idUser, newPassword]);
    }
    async changeUserType(idWho, idUser, idUserType) {
        return this.pgPool.callFunctionScalar('public.change_user_type', [idWho, idUser, idUserType]);
    }
    async saveRefreshToken(userId, refreshToken) {
        await this.pgPool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [refreshToken, userId]);
    }
    async getRefreshToken(userId) {
        const rows = await this.pgPool.query('SELECT refresh_token FROM users WHERE id = $1', [userId]);
        return rows[0]?.refresh_token ?? null;
    }
    async clearRefreshToken(userId) {
        await this.pgPool.query('UPDATE users SET refresh_token = NULL WHERE id = $1', [userId]);
    }
};
exports.UsersRawSqlRepository = UsersRawSqlRepository;
exports.UsersRawSqlRepository = UsersRawSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pg_pool_service_1.PgPoolService])
], UsersRawSqlRepository);
//# sourceMappingURL=users.raw-sql.repository.js.map