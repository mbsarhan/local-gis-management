import { Privilege } from '../entities/privilege.entity';
export interface IPrivilegesRepository {
    findAll(): Promise<any[]>;
    findByUser(userId: number): Promise<Privilege[]>;
    findById(id: number): Promise<Privilege | null>;
    getUserPrivileges(userId: number): Promise<Privilege[]>;
    create(idWho: number, idUser: number, idGovernorate: number, privilegeCode: string, idTownship?: number, idCommunity?: number, idPlanBoundary?: number): Promise<number>;
    delete(id: number): Promise<void>;
}
export declare const PRIVILEGES_REPOSITORY = "PRIVILEGES_REPOSITORY";
