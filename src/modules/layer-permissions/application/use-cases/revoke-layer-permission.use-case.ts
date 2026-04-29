import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ILayerPermissionsRepository, LAYER_PERMISSIONS_REPOSITORY } from '../../domain/repositories/layer-permissions.repository.interface';

@Injectable()
export class RevokeLayerPermissionUseCase {
    constructor(
        @Inject(LAYER_PERMISSIONS_REPOSITORY)
        private readonly repo: ILayerPermissionsRepository,
    ) {}

    async execute(id: number) {
        const existing = await this.repo.findById(id);
        if (!existing) throw new NotFoundException('Layer permission not found');

        const layerName = await this.repo.getLayerName(existing.idLayer);
        if (!layerName) throw new NotFoundException('Layer not found');

        const username = await this.repo.getUsernameById(existing.idUserType);
        if (!username) throw new NotFoundException('User not found or inactive');

        await this.repo.delete(id);
        await this.repo.revokeAll(layerName, username);

        return { id };
    }
}