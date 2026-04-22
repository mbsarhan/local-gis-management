import { IPrivilegesRepository } from '../../domain/repositories/privileges.repository.interface';
export declare class GrantPrivilegeUseCase {
    private readonly privilegesRepository;
    constructor(privilegesRepository: IPrivilegesRepository);
    execute(callerId: number, callerType: number, idUser: number, idGovernorate: number, idTownship?: number, idCommunity?: number, idPlanBoundary?: number): Promise<{
        id: number;
    }>;
}
