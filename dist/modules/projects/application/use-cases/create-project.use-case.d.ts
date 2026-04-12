import { IProjectsRepository } from '../../domain/repositories/projects.repository.interface';
export declare class CreateProjectUseCase {
    private readonly projectsRepository;
    constructor(projectsRepository: IProjectsRepository);
    execute(idWho: number, idProjectManager: number, idPlanBoundary: number, idLayer: number): Promise<{
        id: number;
    }>;
}
