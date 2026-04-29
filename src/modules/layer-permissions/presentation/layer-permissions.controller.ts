import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { AdminGuard } from '../../../shared/guards/roles.guard';
import { GetAllLayerPermissionsUseCase } from '../application/use-cases/get-all-layer-permissions.use-case';
import { GetLayerPermissionsByUserTypeUseCase } from '../application/use-cases/get-layer-permissions-by-user-type.use-case';
import { GrantLayerPermissionUseCase } from '../application/use-cases/grant-layer-permission.use-case';
import { UpdateLayerPermissionUseCase } from '../application/use-cases/update-layer-permission.use-case';
import { RevokeLayerPermissionUseCase } from '../application/use-cases/revoke-layer-permission.use-case';
import { GrantLayerPermissionDto, UpdateLayerPermissionDto } from './dto/layer-permissions.dto';

@Controller('layer-permissions')
@UseGuards(AuthGuard, AdminGuard)
export class LayerPermissionsController {
    constructor(
        private readonly getAllUseCase: GetAllLayerPermissionsUseCase,
        private readonly getByUserUseCase: GetLayerPermissionsByUserTypeUseCase,
        private readonly grantUseCase: GrantLayerPermissionUseCase,
        private readonly updateUseCase: UpdateLayerPermissionUseCase,
        private readonly revokeUseCase: RevokeLayerPermissionUseCase,
    ) { }

    // GET /api/layer-permissions
    @Get()
    async getAll() {
        return this.getAllUseCase.execute();
    }

    // GET /api/layer-permissions/user-type/:id
    @Get('user/:id')
    async getByUser(@Param('id') id: number) {
        return this.getByUserUseCase.execute(id);
    }

    // POST /api/layer-permissions
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async grant(@Body() dto: GrantLayerPermissionDto) {
        return this.grantUseCase.execute(
            dto.id_user,
            dto.id_layer,
            dto.select_b,
            dto.insert_b,
            dto.update_b,
            dto.delete_b,
        );
    }

    // PUT /api/layer-permissions/:id
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateLayerPermissionDto) {
        return this.updateUseCase.execute(
            id,
            dto.select_b,
            dto.insert_b,
            dto.update_b,
            dto.delete_b,
        );
    }

    // DELETE /api/layer-permissions/:id
    @Delete(':id')
    async revoke(@Param('id') id: number) {
        return this.revokeUseCase.execute(id);
    }
}