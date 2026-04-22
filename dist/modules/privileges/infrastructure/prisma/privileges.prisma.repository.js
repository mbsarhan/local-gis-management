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
exports.PrivilegesPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../shared/database/prisma.service");
const pg_pool_service_1 = require("../../../../shared/database/pg-pool.service");
const privilege_entity_1 = require("../../domain/entities/privilege.entity");
const privileges_queries_1 = require("./privileges.queries");
let PrivilegesPrismaRepository = class PrivilegesPrismaRepository {
    constructor(prisma, pgPool) {
        this.prisma = prisma;
        this.pgPool = pgPool;
    }
    mapToEntity(row) {
        return new privilege_entity_1.Privilege(row.id, row.id_user, row.id_governorate, row.id_township, row.id_community, row.id_plan_boundary, row.privilege_code, row.id_who);
    }
    async findAll() {
        const { sql, params } = privileges_queries_1.PrivilegesQueries.findAll();
        return this.pgPool.query(sql, params);
    }
    async findByUser(userId) {
        const { sql, params } = privileges_queries_1.PrivilegesQueries.findByUser(userId);
        const rows = await this.pgPool.query(sql, params);
        return rows.map(row => this.mapToEntity(row));
    }
    async findById(id) {
        const row = await this.prisma.userPrivilege.findUnique({
            where: { id },
        });
        if (!row)
            return null;
        return this.mapToEntity(row);
    }
    async getUserPrivileges(userId) {
        return this.findByUser(userId);
    }
    async create(idWho, idUser, idGovernorate, privilegeCode, idTownship, idCommunity, idPlanBoundary) {
        const row = await this.prisma.userPrivilege.create({
            data: {
                id_user: idUser,
                id_governorate: idGovernorate,
                id_township: idTownship ?? null,
                id_community: idCommunity ?? null,
                id_plan_boundary: idPlanBoundary ?? null,
                privilege_code: privilegeCode,
                id_who: idWho,
            },
        });
        return row.id;
    }
    async delete(id) {
        await this.prisma.userPrivilege.delete({
            where: { id },
        });
    }
};
exports.PrivilegesPrismaRepository = PrivilegesPrismaRepository;
exports.PrivilegesPrismaRepository = PrivilegesPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pg_pool_service_1.PgPoolService])
], PrivilegesPrismaRepository);
//# sourceMappingURL=privileges.prisma.repository.js.map