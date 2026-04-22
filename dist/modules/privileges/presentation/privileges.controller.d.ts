import { GetAllPrivilegesUseCase } from '../application/use-cases/get-all-privileges.use-case';
import { GetUserPrivilegesUseCase } from '../application/use-cases/get-user-privileges.use-case';
import { GrantPrivilegeUseCase } from '../application/use-cases/grant-privilege.use-case';
import { RevokePrivilegeUseCase } from '../application/use-cases/revoke-privilege.use-case';
import { GrantPrivilegeDto } from './dto/privileges.dto';
export declare class PrivilegesController {
    private readonly getAllPrivilegesUseCase;
    private readonly getUserPrivilegesUseCase;
    private readonly grantPrivilegeUseCase;
    private readonly revokePrivilegeUseCase;
    constructor(getAllPrivilegesUseCase: GetAllPrivilegesUseCase, getUserPrivilegesUseCase: GetUserPrivilegesUseCase, grantPrivilegeUseCase: GrantPrivilegeUseCase, revokePrivilegeUseCase: RevokePrivilegeUseCase);
    getAllPrivileges(): Promise<any[]>;
    getUserPrivileges(id: number): Promise<import("../domain/entities/privilege.entity").Privilege[]>;
    grantPrivilege(req: any, dto: GrantPrivilegeDto): Promise<{
        id: number;
    }>;
    revokePrivilege(req: any, id: number): Promise<{
        id: number;
    }>;
}
