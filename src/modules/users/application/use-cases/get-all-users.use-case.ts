import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository.interface';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';
import { UsersQueries } from '../../infrastructure/prisma/users.queries';

@Injectable()
export class GetAllUsersUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: IUsersRepository,
        private readonly pgPool: PgPoolService,
    ) {}

    async execute(userId: number) {
        // Fetch the DB token using userId — get_all_users still needs it internally
        const { sql, params } = UsersQueries.getTokenByUserId(userId);
        const rows  = await this.pgPool.query(sql, params);
        const token = rows[0]?.token;
        return this.usersRepository.findAll(token);
    }
}