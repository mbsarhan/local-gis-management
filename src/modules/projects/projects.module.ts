import { Module }                      from '@nestjs/common';
import { JwtModule }                   from '@nestjs/jwt';
import { ProjectsController }          from './presentation/projects.controller';
import { ProjectsPrismaRepository }    from './infrastructure/prisma/projects.prisma.repository';
import { PROJECTS_REPOSITORY }         from './domain/repositories/projects.repository.interface';
import { AuthGuard }                   from '../../shared/guards/auth.guard';
import { TokenService }                from '../../shared/services/token.service';
import { ConfigService }               from '../../shared/config/config.service';
import { CreateProjectUseCase }        from './application/use-cases/create-project.use-case';
import { GetProjectsUseCase }          from './application/use-cases/get-projects.use-case';
import { StartProjectUseCase }         from './application/use-cases/start-project.use-case';
import { AssignTechnician1UseCase }    from './application/use-cases/assign-technician-1.use-case';
import { Technician1StartUseCase }     from './application/use-cases/technician-1-start.use-case';
import { Technician1ConfirmUseCase }   from './application/use-cases/technician-1-confirm.use-case';
import { AssignTechnician2UseCase }    from './application/use-cases/assign-technician-2.use-case';
import { Technician2StartUseCase }     from './application/use-cases/technician-2-start.use-case';
import { Technician2ConfirmUseCase }   from './application/use-cases/technician-2-confirm.use-case';
import { ReturnToTechnician1UseCase }  from './application/use-cases/return-to-technician-1.use-case';
import { ManagerConfirmUseCase }       from './application/use-cases/manager-confirm.use-case';

const useCases = [
    CreateProjectUseCase,
    GetProjectsUseCase,
    StartProjectUseCase,
    AssignTechnician1UseCase,
    Technician1StartUseCase,
    Technician1ConfirmUseCase,
    AssignTechnician2UseCase,
    Technician2StartUseCase,
    Technician2ConfirmUseCase,
    ReturnToTechnician1UseCase,
    ManagerConfirmUseCase,
];

@Module({
    imports: [JwtModule.register({})],
    controllers: [ProjectsController],
    providers: [
        {
            provide:  PROJECTS_REPOSITORY,
            useClass: ProjectsPrismaRepository,
        },
        AuthGuard,
        TokenService,
        ConfigService,
        ...useCases,
    ],
})
export class ProjectsModule {}