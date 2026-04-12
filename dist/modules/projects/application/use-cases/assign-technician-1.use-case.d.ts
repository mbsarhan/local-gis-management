import { IProjectsRepository } from '../../domain/repositories/projects.repository.interface';
export declare class AssignTechnician1UseCase {
    private readonly projectsRepository;
    constructor(projectsRepository: IProjectsRepository);
    execute(userId: number, projectId: number, idDrawer1: number): Promise<{
        id: number;
    }>;
}
