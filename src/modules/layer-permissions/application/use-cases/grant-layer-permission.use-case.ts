import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ILayerPermissionsRepository, LAYER_PERMISSIONS_REPOSITORY } from '../../domain/repositories/layer-permissions.repository.interface';
import { LayerPermission } from '../../domain/entities/layer-permission.entity';

@Injectable()
export class GrantLayerPermissionUseCase {
    constructor(
        @Inject(LAYER_PERMISSIONS_REPOSITORY)
        private readonly repo: ILayerPermissionsRepository,
    ) { }

    async execute(
        idUserType: number,
        idLayer: number,
        selectB: boolean,
        insertB: boolean,
        updateB: boolean,
        deleteB: boolean,
    ) {
        const permission = new LayerPermission(0, idUserType, idLayer, selectB, insertB, updateB, deleteB);
        if (!permission.hasAtLeastOneFlag()) {
            throw new BadRequestException('At least one permission flag must be true');
        }

        const exists = await this.repo.existsForUserTypeAndLayer(idUserType, idLayer);
        if (exists) {
            throw new BadRequestException('A permission already exists for this user type and layer combination');
        }

        const layerName = await this.repo.getLayerName(idLayer);
        if (!layerName) {
            throw new BadRequestException('Layer not found');
        }

        const id = await this.repo.create(idUserType, idLayer, selectB, insertB, updateB, deleteB);

        const usernames = await this.repo.getUsernamesByType(idUserType);
        await this.repo.applyGrants(layerName, usernames, permission.buildGrantPrivileges());

        return { id };
    }
}