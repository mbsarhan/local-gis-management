import { Injectable, Inject } from '@nestjs/common';
import { ILayerPermissionsRepository, LAYER_PERMISSIONS_REPOSITORY } from '../../domain/repositories/layer-permissions.repository.interface';

@Injectable()
export class GetAllLayerPermissionsUseCase {
    constructor(
        @Inject(LAYER_PERMISSIONS_REPOSITORY)
        private readonly repo: ILayerPermissionsRepository,
    ) {}

    async execute() {
        return this.repo.findAll();
    }
}