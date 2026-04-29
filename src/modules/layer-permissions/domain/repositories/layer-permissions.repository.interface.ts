import { LayerPermission } from '../entities/layer-permission.entity';

export interface ILayerPermissionsRepository {
    findAll(): Promise<any[]>;
    findByUser(idUser: number): Promise<any[]>;
    findById(id: number): Promise<LayerPermission | null>;
    existsForUserAndLayer(idUser: number, idLayer: number): Promise<boolean>;
    getLayerName(idLayer: number): Promise<string | null>;
    getUsernameById(idUser: number): Promise<string | null>;
    create(idUser: number, idLayer: number, selectB: boolean, insertB: boolean, updateB: boolean, deleteB: boolean): Promise<number>;
    update(id: number, selectB: boolean, insertB: boolean, updateB: boolean, deleteB: boolean): Promise<void>;
    delete(id: number): Promise<void>;
    applyGrants(layerName: string, username: string, privileges: string[]): Promise<void>;
    revokeAll(layerName: string, username: string): Promise<void>;
}

export const LAYER_PERMISSIONS_REPOSITORY = 'LAYER_PERMISSIONS_REPOSITORY';