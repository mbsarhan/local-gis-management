import { Module } from '@nestjs/common';
import { DatabaseModule }  from './shared/database/database.module';
import { UsersModule }     from './modules/users/users.module';
import { ProjectsModule }  from './modules/projects/projects.module';

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        ProjectsModule,
    ],
})
export class AppModule {}