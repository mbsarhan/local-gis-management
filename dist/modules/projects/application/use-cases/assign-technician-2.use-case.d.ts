import { IProjectsRepository } from '../../domain/repositories/projects.repository.interface';
export declare class AssignTechnician2UseCase {
    private readonly projectsRepository;
    constructor(projectsRepository: IProjectsRepository);
    execute(userId: number, projectId: number, idDrawer2: number): Promise<{
        id: number;
    }>;
}
