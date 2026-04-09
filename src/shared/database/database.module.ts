import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PgPoolService } from './pg-pool.service';

@Global()  // makes PrismaService and PgPoolService available everywhere without re-importing
@Module({
    providers: [PrismaService, PgPoolService],
    exports:   [PrismaService, PgPoolService],
})
export class DatabaseModule {}