import { LayerPermission } from '../entities/layer-permission.entity';

export interface ILayerPermissionsRepository {
    findAll(): Promise<any[]>;
    findByUserType(idUserType: number): Promise<any[]>;
    findById(id: number): Promise<LayerPermission | null>;
    existsForUserTypeAndLayer(idUserType: number, idLayer: number): Promise<boolean>;
    getLayerName(idLayer: number): Promise<string | null>;
    getUsernamesByType(idUserType: number): Promise<string[]>;
    getPermissionsByUserType(idUserType: number): Promise<LayerPermission[]>;
    create(idUserType: number, idLayer: number, selectB: boolean, insertB: boolean, updateB: boolean, deleteB: boolean): Promise<number>;
    update(id: number, selectB: boolean, insertB: boolean, updateB: boolean, deleteB: boolean): Promise<void>;
    delete(id: number): Promise<void>;
    applyGrants(layerName: string, usernames: string[], privileges: string[]): Promise<void>;
    revokeAll(layerName: string, usernames: string[]): Promise<void>;
}

export const LAYER_PERMISSIONS_REPOSITORY = 'LAYER_PERMISSIONS_REPOSITORY';