import { PrismaService } from '../../../../shared/database/prisma.service';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';
import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
export declare class UsersPrismaRepository implements IUsersRepository {
    private readonly prisma;
    private readonly pgPool;
    constructor(prisma: PrismaService, pgPool: PgPoolService);
    private hashPassword;
    login(username: string, password: string): Promise<{
        u_id: number;
        u_name: string;
        u_token: string;
        u_id_user_type: number;
        name_user_type: string;
    }>;
    findAll(token: string): Promise<any[]>;
    addUser(idWho: number, name: string, username: string, password: string, idUserType: number, idGroup?: number): Promise<number>;
    deactivateUser(idWho: number, idUser: number): Promise<number>;
    reactivateUser(idWho: number, idUser: number): Promise<number>;
    changePassword(idWho: number, idUser: number, newPassword: string): Promise<number>;
    changeUserType(idWho: number, idUser: number, idUserType: number): Promise<number>;
    saveRefreshToken(userId: number, refreshToken: string): Promise<void>;
    getRefreshToken(userId: number): Promise<string | null>;
    clearRefreshToken(userId: number): Promise<void>;
}
