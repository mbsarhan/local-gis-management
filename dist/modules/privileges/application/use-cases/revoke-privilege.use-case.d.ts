import { IPrivilegesRepository } from '../../domain/repositories/privileges.repository.interface';
export declare class RevokePrivilegeUseCase {
    private readonly privilegesRepository;
    constructor(privilegesRepository: IPrivilegesRepository);
    execute(callerId: number, callerType: number, privilegeId: number): Promise<{
        id: number;
    }>;
}
