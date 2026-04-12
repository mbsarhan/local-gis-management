import { IProjectsRepository } from '../../domain/repositories/projects.repository.interface';
export declare class Technician1StartUseCase {
    private readonly projectsRepository;
    constructor(projectsRepository: IProjectsRepository);
    execute(userId: number, projectId: number): Promise<{
        id: number;
    }>;
}
