import { Injectable, Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IProjectsRepository, PROJECTS_REPOSITORY } from '../../domain/repositories/projects.repository.interface';

@Injectable()
export class Technician2StartUseCase {
    constructor(
        @Inject(PROJECTS_REPOSITORY)
        private readonly projectsRepository: IProjectsRepository,
    ) {}

    async execute(userId: number, projectId: number) {
        const project = await this.projectsRepository.findById(projectId);

        if (!project) throw new NotFoundException('Project not found');

        if (!project.isAssignedDrawer2(userId))
            throw new ForbiddenException('Only the assigned technician 2 can start this work');

        if (!project.canTechnician2Start())
            throw new BadRequestException(`Project must be in status ASSIGNED_TECHNICIAN_2 (7) to start. Current status: ${project.idProjectStatus}`);

        await this.projectsRepository.technician2Start(projectId, new Date());

        return { id: projectId };
    }
}