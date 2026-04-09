import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository.interface';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';

@Injectable()
export class GetAllUsersUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: IUsersRepository,
        private readonly pgPool: PgPoolService,
    ) {}

    async execute(userId: number) {
        // get_all_users still uses DB token internally, so we fetch it
        const rows = await this.pgPool.query(
            'SELECT token FROM users WHERE id = $1',
            [userId]
        );
        const token = rows[0]?.token;
        return this.usersRepository.findAll(token);
    }
}