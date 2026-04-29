import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { ILayerPermissionsRepository, LAYER_PERMISSIONS_REPOSITORY } from '../../domain/repositories/layer-permissions.repository.interface';
import { LayerPermission } from '../../domain/entities/layer-permission.entity';

@Injectable()
export class UpdateLayerPermissionUseCase {
    constructor(
        @Inject(LAYER_PERMISSIONS_REPOSITORY)
        private readonly repo: ILayerPermissionsRepository,
    ) {}

    async execute(id: number, selectB: boolean, insertB: boolean, updateB: boolean, deleteB: boolean) {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException('Layer permission not found');

        const updated = new LayerPermission(id, existing.idUserType, existing.idLayer, selectB, insertB, updateB, deleteB);
        if (!updated.hasAtLeastOneFlag()) {
            throw new BadRequestException('At least one permission flag must be true');
        }

        const layerName = await this.repo.getLayerName(existing.idLayer);
        if (!layerName) throw new BadRequestException('Layer not found');

        const username = await this.repo.getUsernameById(existing.idUserType);
        if (!username) throw new NotFoundException('User not found or inactive');

        await this.repo.update(id, selectB, insertB, updateB, deleteB);
        await this.repo.revokeAll(layerName, username);
        await this.repo.applyGrants(layerName, username, updated.buildGrantPrivileges());

        return { id };
    }
}