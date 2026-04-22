import { Module }                      from '@nestjs/common';
import { JwtModule }                   from '@nestjs/jwt';
import { PrivilegesController }        from './presentation/privileges.controller';
import { PrivilegesPrismaRepository }  from './infrastructure/prisma/privileges.prisma.repository';
import { PRIVILEGES_REPOSITORY }       from './domain/repositories/privileges.repository.interface';
import { AuthGuard }                   from '../../shared/guards/auth.guard';
import { TokenService }                from '../../shared/services/token.service';
import { ConfigService }               from '../../shared/config/config.service';
import { GetAllPrivilegesUseCase }     from './application/use-cases/get-all-privileges.use-case';
import { GetUserPrivilegesUseCase }    from './application/use-cases/get-user-privileges.use-case';
import { GrantPrivilegeUseCase }       from './application/use-cases/grant-privilege.use-case';
import { RevokePrivilegeUseCase }      from './application/use-cases/revoke-privilege.use-case';

const useCases = [
    GetAllPrivilegesUseCase,
    GetUserPrivilegesUseCase,
    GrantPrivilegeUseCase,
    RevokePrivilegeUseCase,
];

@Module({
    imports: [JwtModule.register({})],
    controllers: [PrivilegesController],
    providers: [
        {
            provide:  PRIVILEGES_REPOSITORY,
            useClass: PrivilegesPrismaRepository,
        },
        AuthGuard,
        TokenService,
        ConfigService,
        ...useCases,
    ],
})
export class PrivilegesModule {}