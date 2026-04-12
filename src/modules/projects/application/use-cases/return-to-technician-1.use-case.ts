import { Injectable, Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IProjectsRepository, PROJECTS_REPOSITORY } from '../../domain/repositories/projects.repository.interface';

@Injectable()
export class ReturnToTechnician1UseCase {
    constructor(
        @Inject(PROJECTS_REPOSITORY)
        private readonly projectsRepository: IProjectsRepository,
    ) {}

    async execute(userId: number, projectId: number) {
        const project = await this.projectsRepository.findById(projectId);

        if (!project) throw new NotFoundException('Project not found');

        if (!project.isAssignedManager(userId))
            throw new ForbiddenException('Only the assigned project manager can return the project to technician 1');

        if (!project.canReturnToTechnician1())
            throw new BadRequestException(`Project must be in status TECHNICIAN_2_CONFIRMED (9) to return to technician 1. Current status: ${project.idProjectStatus}`);

        await this.projectsRepository.returnToTechnician1(projectId);

        return { id: projectId };
    }
}