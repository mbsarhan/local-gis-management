import { Module } from '@nestjs/common';
import { DatabaseModule }          from './shared/database/database.module';
import { UsersModule }             from './modules/users/users.module';
import { ProjectsModule }          from './modules/projects/projects.module';
import { PrivilegesModule }        from './modules/privileges/privileges.module';
import { LayerPermissionsModule }  from './modules/layer-permissions/layer-permissions.module';

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        ProjectsModule,
        PrivilegesModule,
        LayerPermissionsModule,
    ],
})
export class AppModule {}