export interface IUsersRepository {
    login(username: string, password: string): Promise<any>;
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
export declare const USERS_REPOSITORY = "USERS_REPOSITORY";
