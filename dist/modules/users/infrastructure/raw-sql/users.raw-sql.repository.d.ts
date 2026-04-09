import { PgPoolService } from '../../../../shared/database/pg-pool.service';
import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
export declare class UsersRawSqlRepository implements IUsersRepository {
    private readonly pgPool;
    constructor(pgPool: PgPoolService);
    login(username: string, password: string): Promise<any>;
    findAll(token: string): Promise<any[]>;
    addUser(idWho: number, name: string, username: string, password: string, idUserType: number, idGroup?: number): Promise<any>;
    deactivateUser(idWho: number, idUser: number): Promise<any>;
    reactivateUser(idWho: number, idUser: number): Promise<any>;
    changePassword(idWho: number, idUser: number, newPassword: string): Promise<any>;
    changeUserType(idWho: number, idUser: number, idUserType: number): Promise<any>;
    saveRefreshToken(userId: number, refreshToken: string): Promise<void>;
    getRefreshToken(userId: number): Promise<string | null>;
    clearRefreshToken(userId: number): Promise<void>;
}
