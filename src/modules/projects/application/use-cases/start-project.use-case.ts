import { Injectable, Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IProjectsRepository, PROJECTS_REPOSITORY } from '../../domain/repositories/projects.repository.interface';
import { ProjectStatus } from '../../domain/entities/project.entity';

@Injectable()
export class StartProjectUseCase {
    constructor(
        @Inject(PROJECTS_REPOSITORY)
        private readonly projectsRepository: IProjectsRepository,
    ) {}

    async execute(userId: number, projectId: number) {
        const project = await this.projectsRepository.findById(projectId);

        if (!project) throw new NotFoundException('Project not found');

        if (!project.isAssignedManager(userId))
            throw new ForbiddenException('Only the assigned project manager can start this project');

        if (!project.canStart())
            throw new BadRequestException(`Project must be in status NEW (1) to start. Current status: ${project.idProjectStatus}`);

        await this.projectsRepository.startProject(projectId, new Date());

        return { id: projectId };
    }
}