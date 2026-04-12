import { Injectable, Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IProjectsRepository, PROJECTS_REPOSITORY } from '../../domain/repositories/projects.repository.interface';

@Injectable()
export class Technician2ConfirmUseCase {
    constructor(
        @Inject(PROJECTS_REPOSITORY)
        private readonly projectsRepository: IProjectsRepository,
    ) {}

    async execute(userId: number, projectId: number) {
        const project = await this.projectsRepository.findById(projectId);

        if (!project) throw new NotFoundException('Project not found');

        if (!project.isAssignedDrawer2(userId))
            throw new ForbiddenException('Only the assigned technician 2 can confirm this work');

        if (!project.canTechnician2Confirm())
            throw new BadRequestException(`Project must be in status TECHNICIAN_2_WORKING (8) to confirm. Current status: ${project.idProjectStatus}`);

        await this.projectsRepository.technician2Confirm(projectId, new Date());

        const hasOtherProjects = await this.projectsRepository.hasOtherActiveProjects(userId, project.idPlanBoundary, projectId);
        if (!hasOtherProjects) {
            await this.projectsRepository.revokePrivilege(userId, project.idPlanBoundary);
        }

        return { id: projectId };
    }
}