import { IPrivilegesRepository } from '../../domain/repositories/privileges.repository.interface';
export declare class GetUserPrivilegesUseCase {
    private readonly privilegesRepository;
    constructor(privilegesRepository: IPrivilegesRepository);
    execute(userId: number): Promise<import("../../domain/entities/privilege.entity").Privilege[]>;
}
