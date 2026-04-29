import { Module }                              from '@nestjs/common';
import { JwtModule }                           from '@nestjs/jwt';
import { LayerPermissionsController }          from './presentation/layer-permissions.controller';
import { LayerPermissionsPrismaRepository }    from './infrastructure/prisma/layer-permissions.prisma.repository';
import { LAYER_PERMISSIONS_REPOSITORY }        from './domain/repositories/layer-permissions.repository.interface';
import { AuthGuard }                           from '../../shared/guards/auth.guard';
import { TokenService }                        from '../../shared/services/token.service';
import { ConfigService }                       from '../../shared/config/config.service';
import { GetAllLayerPermissionsUseCase }       from './application/use-cases/get-all-layer-permissions.use-case';
import { GetLayerPermissionsByUserTypeUseCase } from './application/use-cases/get-layer-permissions-by-user-type.use-case';
import { GrantLayerPermissionUseCase }         from './application/use-cases/grant-layer-permission.use-case';
import { UpdateLayerPermissionUseCase }        from './application/use-cases/update-layer-permission.use-case';
import { RevokeLayerPermissionUseCase }        from './application/use-cases/revoke-layer-permission.use-case';

const useCases = [
    GetAllLayerPermissionsUseCase,
    GetLayerPermissionsByUserTypeUseCase,
    GrantLayerPermissionUseCase,
    UpdateLayerPermissionUseCase,
    RevokeLayerPermissionUseCase,
];

@Module({
    imports: [JwtModule.register({})],
    controllers: [LayerPermissionsController],
    providers: [
        {
            provide:  LAYER_PERMISSIONS_REPOSITORY,
            useClass: LayerPermissionsPrismaRepository,
        },
        AuthGuard,
        TokenService,
        ConfigService,
        ...useCases,
    ],
})

export class LayerPermissionsModule {}