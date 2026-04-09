import { Module }            from '@nestjs/common';
import { ConfigService } from '../../shared/config/config.service';
import { JwtModule }         from '@nestjs/jwt';
import { UsersController }         from './presentation/users.controller';
import { UsersRawSqlRepository }   from './infrastructure/raw-sql/users.raw-sql.repository';
import { USERS_REPOSITORY }        from './domain/repositories/users.repository.interface';
import { TokenService }            from '../../shared/services/token.service';
import { AuthGuard }               from '../../shared/guards/auth.guard';
import { RefreshTokenGuard }       from '../../shared/guards/refresh-token.guard';
import { LoginUseCase }            from './application/use-cases/login.use-case';
import { LogoutUseCase }           from './application/use-cases/logout.use-case';
import { RefreshTokenUseCase }     from './application/use-cases/refresh-token.use-case';
import { GetAllUsersUseCase }      from './application/use-cases/get-all-users.use-case';
import { AddUserUseCase }          from './application/use-cases/add-user.use-case';
import { DeactivateUserUseCase }   from './application/use-cases/deactivate-user.use-case';
import { ReactivateUserUseCase }   from './application/use-cases/reactivate-user.use-case';
import { ChangePasswordUseCase }   from './application/use-cases/change-password.use-case';
import { ChangeUserTypeUseCase }   from './application/use-cases/change-user-type.use-case';

const useCases = [
    LoginUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    GetAllUsersUseCase,
    AddUserUseCase,
    DeactivateUserUseCase,
    ReactivateUserUseCase,
    ChangePasswordUseCase,
    ChangeUserTypeUseCase,
];

@Module({
    imports: [JwtModule.register({})],
    controllers: [UsersController],
    providers: [
        {
            provide:  USERS_REPOSITORY,
            useClass: UsersRawSqlRepository,
        },
        ConfigService,
        TokenService,
        AuthGuard,
        RefreshTokenGuard,
        ...useCases,
    ],
})
export class UsersModule {}