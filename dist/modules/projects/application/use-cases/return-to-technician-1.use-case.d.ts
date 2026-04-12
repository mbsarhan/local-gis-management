import { IProjectsRepository } from '../../domain/repositories/projects.repository.interface';
export declare class ReturnToTechnician1UseCase {
    private readonly projectsRepository;
    constructor(projectsRepository: IProjectsRepository);
    execute(userId: number, projectId: number): Promise<{
        id: number;
    }>;
}
