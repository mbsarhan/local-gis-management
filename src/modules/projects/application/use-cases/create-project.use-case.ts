import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IProjectsRepository, PROJECTS_REPOSITORY } from '../../domain/repositories/projects.repository.interface';

@Injectable()
export class CreateProjectUseCase {
    constructor(
        @Inject(PROJECTS_REPOSITORY)
        private readonly projectsRepository: IProjectsRepository,
    ) {}

    async execute(idWho: number, idProjectManager: number, idPlanBoundary: number, idLayer: number) {
        if (!idProjectManager || !idPlanBoundary || !idLayer) {
            throw new BadRequestException('idProjectManager, idPlanBoundary and idLayer are required');
        }

        const id = await this.projectsRepository.createProject(
            idWho,
            idProjectManager,
            idPlanBoundary,
            idLayer,
        );

        return { id };
    }
}