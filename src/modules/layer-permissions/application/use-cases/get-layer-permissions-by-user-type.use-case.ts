import { Injectable, Inject } from '@nestjs/common';
import { ILayerPermissionsRepository, LAYER_PERMISSIONS_REPOSITORY } from '../../domain/repositories/layer-permissions.repository.interface';

@Injectable()
export class GetLayerPermissionsByUserTypeUseCase {
    constructor(
        @Inject(LAYER_PERMISSIONS_REPOSITORY)
        private readonly repo: ILayerPermissionsRepository,
    ) {}

    async execute(idUserType: number) {
        return this.repo.findByUserType(idUserType);
    }
}