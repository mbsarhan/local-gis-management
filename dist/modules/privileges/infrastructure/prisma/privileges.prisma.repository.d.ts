import { PrismaService } from '../../../../shared/database/prisma.service';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';
import { IPrivilegesRepository } from '../../domain/repositories/privileges.repository.interface';
import { Privilege } from '../../domain/entities/privilege.entity';
export declare class PrivilegesPrismaRepository implements IPrivilegesRepository {
    private readonly prisma;
    private readonly pgPool;
    constructor(prisma: PrismaService, pgPool: PgPoolService);
    private mapToEntity;
    findAll(): Promise<any[]>;
    findByUser(userId: number): Promise<Privilege[]>;
    findById(id: number): Promise<Privilege | null>;
    getUserPrivileges(userId: number): Promise<Privilege[]>;
    create(idWho: number, idUser: number, idGovernorate: number, privilegeCode: string, idTownship?: number, idCommunity?: number, idPlanBoundary?: number): Promise<number>;
    delete(id: number): Promise<void>;
}
