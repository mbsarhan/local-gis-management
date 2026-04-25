import { Module } from '@nestjs/common';
import { DatabaseModule }    from './shared/database/database.module';
import { UsersModule }       from './modules/users/users.module';
import { ProjectsModule }    from './modules/projects/projects.module';
import { PrivilegesModule }  from './modules/privileges/privileges.module';
import { ControlAdministrationModule } from './modules/control-administration/control-administration.module';

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        ProjectsModule,
        PrivilegesModule,
        ControlAdministrationModule
    ],
})
export class AppModule {}


