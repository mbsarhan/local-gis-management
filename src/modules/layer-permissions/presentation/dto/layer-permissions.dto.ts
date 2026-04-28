export class GrantLayerPermissionDto {
    id_user_type: number;
    id_layer:     number;
    select_b:     boolean;
    insert_b:     boolean;
    update_b:     boolean;
    delete_b:     boolean;
}

export class UpdateLayerPermissionDto {
    select_b: boolean;
    insert_b: boolean;
    update_b: boolean;
    delete_b: boolean;
}