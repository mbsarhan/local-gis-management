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
const users_queries_1 = require("./users.queries");
const crypto = require("crypto");
let UsersPrismaRepository = class UsersPrismaRepository {
    constructor(prisma, pgPool) {
        this.prisma = prisma;
        this.pgPool = pgPool;
    }
    hashPassword(password) {
        return crypto.createHash('md5').update(password).digest('hex');
    }
    async login(username, password) {
        const user = await this.prisma.user.findFirst({
            where: { username, password: this.hashPassword(password), isactive: true },
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
        const { sql, params } = users_queries_1.UsersQueries.getAllUsers(token);
        return this.pgPool.query(sql, params);
    }
    async addUser(idWho, name, username, password, idUserType, idGroup) {
        const userTypeExists = await this.prisma.userType.findUnique({
            where: { id: idUserType },
        });
        if (!userTypeExists) {
            throw new common_1.BadRequestException('User type not found');
        }
        const user = await this.prisma.user.create({
            data: {
                name,
                username,
                password: this.hashPassword(password),
                isactive: true,
                id_user_type: idUserType,
                id_group: idGroup ?? null,
                id_who: idWho,
                date: new Date(),
            },
        });
        const { sql, params } = users_queries_1.UsersQueries.createRole(this.pgPool.quoteIdentifier(username), this.pgPool.quoteLiteral(password));
        await this.pgPool.query(sql, params);
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
        const { sql, params } = users_queries_1.UsersQueries.alterRoleNoLogin(this.pgPool.quoteIdentifier(user.username));
        await this.pgPool.query(sql, params);
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
        const { sql, params } = users_queries_1.UsersQueries.alterRoleLogin(this.pgPool.quoteIdentifier(user.username));
        await this.pgPool.query(sql, params);
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
        await this.prisma.user.update({
            where: { id: idUser },
            data: { password: this.hashPassword(newPassword) },
        });
        const { sql, params } = users_queries_1.UsersQueries.alterRolePassword(this.pgPool.quoteIdentifier(user.username), this.pgPool.quoteLiteral(newPassword));
        await this.pgPool.query(sql, params);
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