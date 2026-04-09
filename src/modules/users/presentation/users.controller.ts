import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    Req,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthGuard }             from '../../../shared/guards/auth.guard';
import { RefreshTokenGuard }     from '../../../shared/guards/refresh-token.guard';
import { LoginUseCase }          from '../application/use-cases/login.use-case';
import { LogoutUseCase }         from '../application/use-cases/logout.use-case';
import { RefreshTokenUseCase }   from '../application/use-cases/refresh-token.use-case';
import { GetAllUsersUseCase }    from '../application/use-cases/get-all-users.use-case';
import { AddUserUseCase }        from '../application/use-cases/add-user.use-case';
import { DeactivateUserUseCase } from '../application/use-cases/deactivate-user.use-case';
import { ReactivateUserUseCase } from '../application/use-cases/reactivate-user.use-case';
import { ChangePasswordUseCase } from '../application/use-cases/change-password.use-case';
import { ChangeUserTypeUseCase } from '../application/use-cases/change-user-type.use-case';
import { LoginDto, AddUserDto, ChangePasswordDto, ChangeUserTypeDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly loginUseCase:          LoginUseCase,
        private readonly logoutUseCase:         LogoutUseCase,
        private readonly refreshTokenUseCase:   RefreshTokenUseCase,
        private readonly getAllUsersUseCase:     GetAllUsersUseCase,
        private readonly addUserUseCase:         AddUserUseCase,
        private readonly deactivateUserUseCase:  DeactivateUserUseCase,
        private readonly reactivateUserUseCase:  ReactivateUserUseCase,
        private readonly changePasswordUseCase:  ChangePasswordUseCase,
        private readonly changeUserTypeUseCase:  ChangeUserTypeUseCase,
    ) {}

    // POST /api/users/login — public
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto) {
        return this.loginUseCase.execute(dto.username, dto.password);
    }

    // POST /api/users/refresh — uses refresh token guard
    @Post('refresh')
    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() req: any) {
        return this.refreshTokenUseCase.execute(req.userId, req.refreshToken);
    }

    // POST /api/users/logout — protected
    @Post('logout')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async logout(@Req() req: any) {
        return this.logoutUseCase.execute(req.userId);
    }

    // GET /api/users — protected
    @Get()
    @UseGuards(AuthGuard)
    async getAllUsers(@Req() req: any) {
        // get_all_users still needs the DB token for its internal logic
        // so we fetch it from DB using userId
        return this.getAllUsersUseCase.execute(req.userId);
    }

    // POST /api/users — protected
    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async addUser(@Req() req: any, @Body() dto: AddUserDto) {
        const id = await this.addUserUseCase.execute(
            req.userId,
            dto.name,
            dto.username,
            dto.password,
            dto.id_user_type,
            dto.id_group,
        );
        return { id };
    }

    // PATCH /api/users/:id/deactivate — protected
    @Patch(':id/deactivate')
    @UseGuards(AuthGuard)
    async deactivateUser(@Req() req: any, @Param('id') id: number) {
        return this.deactivateUserUseCase.execute(req.userId, id);
    }

    // PATCH /api/users/:id/reactivate — protected
    @Patch(':id/reactivate')
    @UseGuards(AuthGuard)
    async reactivateUser(@Req() req: any, @Param('id') id: number) {
        return this.reactivateUserUseCase.execute(req.userId, id);
    }

    // PATCH /api/users/:id/change-password — protected
    @Patch(':id/change-password')
    @UseGuards(AuthGuard)
    async changePassword(@Req() req: any, @Param('id') id: number, @Body() dto: ChangePasswordDto) {
        return this.changePasswordUseCase.execute(req.userId, id, dto.new_password);
    }

    // PATCH /api/users/:id/change-type — protected
    @Patch(':id/change-type')
    @UseGuards(AuthGuard)
    async changeUserType(@Req() req: any, @Param('id') id: number, @Body() dto: ChangeUserTypeDto) {
        return this.changeUserTypeUseCase.execute(req.userId, id, dto.id_user_type);
    }
}