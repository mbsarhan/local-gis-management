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
exports.ProjectsPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../shared/database/prisma.service");
const pg_pool_service_1 = require("../../../../shared/database/pg-pool.service");
const project_entity_1 = require("../../domain/entities/project.entity");
const projects_queries_1 = require("./projects.queries");
let ProjectsPrismaRepository = class ProjectsPrismaRepository {
    constructor(prisma, pgPool) {
        this.prisma = prisma;
        this.pgPool = pgPool;
    }
    mapToEntity(row) {
        return new project_entity_1.Project(row.id, row.id_projecte_manager, row.id_drawer_1, row.id_drawer_2, row.id_project_status, row.id_layer, row.id_plan_boundary, row.id_who);
    }
    async findAll() {
        const { sql, params } = projects_queries_1.ProjectsQueries.findAll();
        return this.pgPool.query(sql, params);
    }
    async findById(id) {
        const project = await this.prisma.regulatoryAreaProject.findUnique({
            where: { id },
        });
        if (!project)
            return null;
        return this.mapToEntity(project);
    }
    async createProject(idWho, idProjectManager, idPlanBoundary, idLayer) {
        const project = await this.prisma.regulatoryAreaProject.create({
            data: {
                id_projecte_manager: idProjectManager,
                date_assignment_projecte_manager: new Date(),
                id_project_status: project_entity_1.ProjectStatus.NEW,
                id_plan_boundary: idPlanBoundary,
                id_layer: idLayer,
                id_community: null,
                id_who: idWho,
            },
        });
        return project.id;
    }
    async startProject(id, startDate) {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                projecte_start_date: startDate,
                id_project_status: project_entity_1.ProjectStatus.MANAGER_WORKING,
            },
        });
    }
    async assignTechnician1(id, idDrawer1, assignmentDate) {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                id_drawer_1: idDrawer1,
                date_assignment_drawer_1: assignmentDate,
                id_project_status: project_entity_1.ProjectStatus.ASSIGNED_TECHNICIAN_1,
            },
        });
    }
    async technician1Start(id, startDate) {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                drawer_1_start_date: startDate,
                id_project_status: project_entity_1.ProjectStatus.TECHNICIAN_1_WORKING,
            },
        });
    }
    async technician1Confirm(id, endDate) {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                drawer_1_end_date: endDate,
                id_project_status: project_entity_1.ProjectStatus.TECHNICIAN_1_CONFIRMED,
            },
        });
    }
    async assignTechnician2(id, idDrawer2, assignmentDate) {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                id_drawer_2: idDrawer2,
                date_assignment_drawer_2: assignmentDate,
                id_project_status: project_entity_1.ProjectStatus.ASSIGNED_TECHNICIAN_2,
            },
        });
    }
    async technician2Start(id, startDate) {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                drawer_2_start_date: startDate,
                id_project_status: project_entity_1.ProjectStatus.TECHNICIAN_2_WORKING,
            },
        });
    }
    async technician2Confirm(id, endDate) {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                drawer_2_end_date: endDate,
                id_project_status: project_entity_1.ProjectStatus.TECHNICIAN_2_CONFIRMED,
            },
        });
    }
    async returnToTechnician1(id) {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                id_drawer_1: null,
                date_assignment_drawer_1: null,
                drawer_1_start_date: null,
                drawer_1_end_date: null,
                id_drawer_2: null,
                date_assignment_drawer_2: null,
                drawer_2_start_date: null,
                drawer_2_end_date: null,
                id_project_status: project_entity_1.ProjectStatus.RETURNED_TECHNICIAN_1,
            },
        });
    }
    async managerConfirm(id, endDate) {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                projecte_end_date: endDate,
                id_project_status: project_entity_1.ProjectStatus.MANAGER_CONFIRMED,
            },
        });
    }
    async hasPrivilege(userId, planBoundaryId) {
        const privilege = await this.prisma.userPrivilege.findFirst({
            where: {
                id_user: userId,
                id_plan_boundary: planBoundaryId,
            },
        });
        return !!privilege;
    }
    async grantPrivilege(userId, planBoundaryId, idWho) {
        await this.prisma.userPrivilege.create({
            data: {
                id_user: userId,
                id_plan_boundary: planBoundaryId,
                id_who: idWho,
            },
        });
    }
    async revokePrivilege(userId, planBoundaryId) {
        await this.prisma.userPrivilege.deleteMany({
            where: {
                id_user: userId,
                id_plan_boundary: planBoundaryId,
            },
        });
    }
    async hasOtherActiveProjects(userId, planBoundaryId, excludeProjectId) {
        const { sql, params } = projects_queries_1.ProjectsQueries.hasOtherActiveProjects(userId, planBoundaryId, excludeProjectId);
        const rows = await this.pgPool.query(sql, params);
        return parseInt(rows[0]?.count) > 0;
    }
};
exports.ProjectsPrismaRepository = ProjectsPrismaRepository;
exports.ProjectsPrismaRepository = ProjectsPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pg_pool_service_1.PgPoolService])
], ProjectsPrismaRepository);
//# sourceMappingURL=projects.prisma.repository.js.map