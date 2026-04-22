import { Module } from '@nestjs/common';
import { DatabaseModule }    from './shared/database/database.module';
import { UsersModule }       from './modules/users/users.module';
import { ProjectsModule }    from './modules/projects/projects.module';
import { PrivilegesModule }  from './modules/privileges/privileges.module';

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        ProjectsModule,
        PrivilegesModule,
    ],
})
export class AppModule {}