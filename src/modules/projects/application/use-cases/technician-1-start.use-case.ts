import { Injectable, Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IProjectsRepository, PROJECTS_REPOSITORY } from '../../domain/repositories/projects.repository.interface';

@Injectable()
export class Technician1StartUseCase {
    constructor(
        @Inject(PROJECTS_REPOSITORY)
        private readonly projectsRepository: IProjectsRepository,
    ) {}

    async execute(userId: number, projectId: number) {
        const project = await this.projectsRepository.findById(projectId);

        if (!project) throw new NotFoundException('Project not found');

        if (!project.isAssignedDrawer1(userId))
            throw new ForbiddenException('Only the assigned technician 1 can start this work');

        if (!project.canTechnician1Start())
            throw new BadRequestException(`Project must be in status ASSIGNED_TECHNICIAN_1 (4) to start. Current status: ${project.idProjectStatus}`);

        await this.projectsRepository.technician1Start(projectId, new Date());

        return { id: projectId };
    }
}