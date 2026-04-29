import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { ILayerPermissionsRepository, LAYER_PERMISSIONS_REPOSITORY } from '../../domain/repositories/layer-permissions.repository.interface';
import { LayerPermission } from '../../domain/entities/layer-permission.entity';

@Injectable()
export class GrantLayerPermissionUseCase {
    constructor(
        @Inject(LAYER_PERMISSIONS_REPOSITORY)
        private readonly repo: ILayerPermissionsRepository,
    ) {}

    async execute(idUser: number, idLayer: number, selectB: boolean, insertB: boolean, updateB: boolean, deleteB: boolean) {
        const permission = new LayerPermission(0, idUser, idLayer, selectB, insertB, updateB, deleteB);
        if (!permission.hasAtLeastOneFlag()) {
            throw new BadRequestException('At least one permission flag must be true');
        }

        const exists = await this.repo.existsForUserAndLayer(idUser, idLayer);
        if (exists) {
            throw new BadRequestException('A permission already exists for this user and layer combination');
        }

        const layerName = await this.repo.getLayerName(idLayer);
        if (!layerName) throw new BadRequestException('Layer not found');

        const username = await this.repo.getUsernameById(idUser);
        if (!username) throw new NotFoundException('User not found or inactive');

        const id = await this.repo.create(idUser, idLayer, selectB, insertB, updateB, deleteB);
        await this.repo.applyGrants(layerName, username, permission.buildGrantPrivileges());

        return { id };
    }
}