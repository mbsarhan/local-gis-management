import { Injectable, Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IProjectsRepository, PROJECTS_REPOSITORY } from '../../domain/repositories/projects.repository.interface';

@Injectable()
export class AssignTechnician1UseCase {
    constructor(
        @Inject(PROJECTS_REPOSITORY)
        private readonly projectsRepository: IProjectsRepository,
    ) {}

    async execute(userId: number, projectId: number, idDrawer1: number) {
        const project = await this.projectsRepository.findById(projectId);

        if (!project) throw new NotFoundException('Project not found');

        if (!project.isAssignedManager(userId))
            throw new ForbiddenException('Only the assigned project manager can assign technician 1');

        if (!project.canAssignTechnician1())
            throw new BadRequestException(`Project must be in status MANAGER_WORKING (3) or RETURNED_TECHNICIAN_1 (10) to assign technician 1. Current status: ${project.idProjectStatus}`);

        const hasPrivilege = await this.projectsRepository.hasPrivilege(idDrawer1, project.idPlanBoundary);
        if (!hasPrivilege) {
            await this.projectsRepository.grantPrivilege(idDrawer1, project.idPlanBoundary, userId);
        }

        await this.projectsRepository.assignTechnician1(projectId, idDrawer1, new Date());

        return { id: projectId };
    }
}