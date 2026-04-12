import { Injectable, Inject } from '@nestjs/common';
import { IProjectsRepository, PROJECTS_REPOSITORY } from '../../domain/repositories/projects.repository.interface';

@Injectable()
export class GetProjectsUseCase {
    constructor(
        @Inject(PROJECTS_REPOSITORY)
        private readonly projectsRepository: IProjectsRepository,
    ) {}

    async execute() {
        return this.projectsRepository.findAll();
    }
}