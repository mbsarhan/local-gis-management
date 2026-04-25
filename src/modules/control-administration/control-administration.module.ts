import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// 1. Controller
import { ControlAdministrationController } from '../control-administration/presentation/controllers/control-administration.controller';

// 2. Application Layer (Use Cases)
import { GetAllControlsUseCase } from '../control-administration/application/use-cases/get-all-control-admin.use-case';
import { CreateControlUseCase } from '../control-administration/application/use-cases/create-control-admin.use-case';
import { UpdateControlUseCase } from '../control-administration/application/use-cases/update-control-admin.use-case';
import { DeleteControlUseCase } from '../control-administration/application/use-cases/delete-control-admin.use-case';
import { GetByCommunityUseCase } from '../control-administration/application/use-cases/get-by-community.use-case';

// 3. Infrastructure & Domain Layer
import { ControlAdministrationPrismaRepository } from '../control-administration/infrastructure/prisma/control-administration.prisma.repository';
import { IControlAdministrationRepository } from '../control-administration/domain/repositories/control-administration.repository.interface';
import { PrismaService } from '../../shared/database/prisma.service'; // تأكد من مسار البريزما سيرفس
import { TokenService } from '../../shared/services/token.service';
import { ConfigService } from '../../shared/config/config.service';
import { AuthGuard } from '../../shared/guards/auth.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ControlAdministrationController],
  providers: [
    GetAllControlsUseCase,
    CreateControlUseCase,
    UpdateControlUseCase,
    DeleteControlUseCase,
    GetByCommunityUseCase,
    TokenService,
    ConfigService,
    AuthGuard,

    {
      provide: IControlAdministrationRepository,
      useClass: ControlAdministrationPrismaRepository,
    },
    
    PrismaService, 
  ],
  exports: [
    IControlAdministrationRepository 
  ]
})
export class ControlAdministrationModule {}
