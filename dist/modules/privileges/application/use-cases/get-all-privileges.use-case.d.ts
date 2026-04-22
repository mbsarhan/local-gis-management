import { IPrivilegesRepository } from '../../domain/repositories/privileges.repository.interface';
export declare class GetAllPrivilegesUseCase {
    private readonly privilegesRepository;
    constructor(privilegesRepository: IPrivilegesRepository);
    execute(): Promise<any[]>;
}
