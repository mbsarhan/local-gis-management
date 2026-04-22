import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Req,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthGuard }                  from '../../../shared/guards/auth.guard';
import { AdminOrManagerGuard }        from '../../../shared/guards/roles.guard';
import { GetAllPrivilegesUseCase }    from '../application/use-cases/get-all-privileges.use-case';
import { GetUserPrivilegesUseCase }   from '../application/use-cases/get-user-privileges.use-case';
import { GrantPrivilegeUseCase }      from '../application/use-cases/grant-privilege.use-case';
import { RevokePrivilegeUseCase }     from '../application/use-cases/revoke-privilege.use-case';
import { GrantPrivilegeDto }          from './dto/privileges.dto';

@Controller('privileges')
@UseGuards(AuthGuard)
export class PrivilegesController {
    constructor(
        private readonly getAllPrivilegesUseCase:  GetAllPrivilegesUseCase,
        private readonly getUserPrivilegesUseCase: GetUserPrivilegesUseCase,
        private readonly grantPrivilegeUseCase:    GrantPrivilegeUseCase,
        private readonly revokePrivilegeUseCase:   RevokePrivilegeUseCase,
    ) {}

    // GET /api/privileges
    @Get()
    @UseGuards(AdminOrManagerGuard)
    async getAllPrivileges() {
        return this.getAllPrivilegesUseCase.execute();
    }

    // GET /api/privileges/user/:id
    @Get('user/:id')
    @UseGuards(AdminOrManagerGuard)
    async getUserPrivileges(@Param('id') id: number) {
        return this.getUserPrivilegesUseCase.execute(id);
    }

    // POST /api/privileges
    @Post()
    @UseGuards(AdminOrManagerGuard)
    @HttpCode(HttpStatus.CREATED)
    async grantPrivilege(@Req() req: any, @Body() dto: GrantPrivilegeDto) {
        return this.grantPrivilegeUseCase.execute(
            req.userId,
            req.userType,
            dto.id_user,
            dto.id_governorate,
            dto.id_township,
            dto.id_community,
            dto.id_plan_boundary,
        );
    }

    // DELETE /api/privileges/:id
    @Delete(':id')
    @UseGuards(AdminOrManagerGuard)
    async revokePrivilege(@Req() req: any, @Param('id') id: number) {
        return this.revokePrivilegeUseCase.execute(req.userId, req.userType, id);
    }
}