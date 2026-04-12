import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma.service';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';
import { IProjectsRepository } from '../../domain/repositories/projects.repository.interface';
import { Project, ProjectStatus } from '../../domain/entities/project.entity';
import { ProjectsQueries } from './projects.queries';

@Injectable()
export class ProjectsPrismaRepository implements IProjectsRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly pgPool: PgPoolService,
    ) {}

    // ── Helpers ───────────────────────────────────────────────────────────

    private mapToEntity(row: any): Project {
        return new Project(
            row.id,
            row.id_projecte_manager,
            row.id_drawer_1,
            row.id_drawer_2,
            row.id_project_status,
            row.id_layer,
            row.id_plan_boundary,
            row.id_who,
        );
    }

    // ── Read ──────────────────────────────────────────────────────────────

    async findAll(): Promise<any[]> {
        const { sql, params } = ProjectsQueries.findAll();
        return this.pgPool.query(sql, params);
    }

    async findById(id: number): Promise<Project | null> {
        const project = await this.prisma.regulatoryAreaProject.findUnique({
            where: { id },
        });
        if (!project) return null;
        return this.mapToEntity(project);
    }

    // ── Create ────────────────────────────────────────────────────────────

    async createProject(
        idWho: number,
        idProjectManager: number,
        idPlanBoundary: number,
        idLayer: number,
    ): Promise<number> {
        const project = await this.prisma.regulatoryAreaProject.create({
            data: {
                id_projecte_manager:              idProjectManager,
                date_assignment_projecte_manager: new Date(),
                id_project_status:                ProjectStatus.NEW,
                id_plan_boundary:                 idPlanBoundary,
                id_layer:                         idLayer,
                id_community:                     null,
                id_who:                           idWho,
            },
        });
        return project.id;
    }

    // ── Status Transitions ────────────────────────────────────────────────

    async startProject(id: number, startDate: Date): Promise<void> {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                projecte_start_date: startDate,
                id_project_status:   ProjectStatus.MANAGER_WORKING,
            },
        });
    }

    async assignTechnician1(id: number, idDrawer1: number, assignmentDate: Date): Promise<void> {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                id_drawer_1:              idDrawer1,
                date_assignment_drawer_1: assignmentDate,
                id_project_status:        ProjectStatus.ASSIGNED_TECHNICIAN_1,
            },
        });
    }

    async technician1Start(id: number, startDate: Date): Promise<void> {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                drawer_1_start_date: startDate,
                id_project_status:   ProjectStatus.TECHNICIAN_1_WORKING,
            },
        });
    }

    async technician1Confirm(id: number, endDate: Date): Promise<void> {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                drawer_1_end_date: endDate,
                id_project_status: ProjectStatus.TECHNICIAN_1_CONFIRMED,
            },
        });
    }

    async assignTechnician2(id: number, idDrawer2: number, assignmentDate: Date): Promise<void> {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                id_drawer_2:              idDrawer2,
                date_assignment_drawer_2: assignmentDate,
                id_project_status:        ProjectStatus.ASSIGNED_TECHNICIAN_2,
            },
        });
    }

    async technician2Start(id: number, startDate: Date): Promise<void> {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                drawer_2_start_date: startDate,
                id_project_status:   ProjectStatus.TECHNICIAN_2_WORKING,
            },
        });
    }

    async technician2Confirm(id: number, endDate: Date): Promise<void> {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                drawer_2_end_date: endDate,
                id_project_status: ProjectStatus.TECHNICIAN_2_CONFIRMED,
            },
        });
    }

    async returnToTechnician1(id: number): Promise<void> {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                // Reset technician 1 and 2 fields for the new cycle
                id_drawer_1:              null,
                date_assignment_drawer_1: null,
                drawer_1_start_date:      null,
                drawer_1_end_date:        null,
                id_drawer_2:              null,
                date_assignment_drawer_2: null,
                drawer_2_start_date:      null,
                drawer_2_end_date:        null,
                id_project_status:        ProjectStatus.RETURNED_TECHNICIAN_1,
            },
        });
    }

    async managerConfirm(id: number, endDate: Date): Promise<void> {
        await this.prisma.regulatoryAreaProject.update({
            where: { id },
            data: {
                projecte_end_date: endDate,
                id_project_status: ProjectStatus.MANAGER_CONFIRMED,
            },
        });
    }

    // ── Privilege Management ──────────────────────────────────────────────

    async hasPrivilege(userId: number, planBoundaryId: number): Promise<boolean> {
        const privilege = await this.prisma.userPrivilege.findFirst({
            where: {
                id_user:          userId,
                id_plan_boundary: planBoundaryId,
            },
        });
        return !!privilege;
    }

    async grantPrivilege(userId: number, planBoundaryId: number, idWho: number): Promise<void> {
        await this.prisma.userPrivilege.create({
            data: {
                id_user:          userId,
                id_plan_boundary: planBoundaryId,
                id_who:           idWho,
            },
        });
    }

    async revokePrivilege(userId: number, planBoundaryId: number): Promise<void> {
        await this.prisma.userPrivilege.deleteMany({
            where: {
                id_user:          userId,
                id_plan_boundary: planBoundaryId,
            },
        });
    }

    async hasOtherActiveProjects(userId: number, planBoundaryId: number, excludeProjectId: number): Promise<boolean> {
        const { sql, params } = ProjectsQueries.hasOtherActiveProjects(userId, planBoundaryId, excludeProjectId);
        const rows = await this.pgPool.query(sql, params);
        return parseInt(rows[0]?.count) > 0;
    }
}