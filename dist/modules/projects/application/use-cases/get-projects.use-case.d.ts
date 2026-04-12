import { IProjectsRepository } from '../../domain/repositories/projects.repository.interface';
export declare class GetProjectsUseCase {
    private readonly projectsRepository;
    constructor(projectsRepository: IProjectsRepository);
    execute(): Promise<any[]>;
}
