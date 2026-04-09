import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';
export declare class GetAllUsersUseCase {
    private readonly usersRepository;
    private readonly pgPool;
    constructor(usersRepository: IUsersRepository, pgPool: PgPoolService);
    execute(userId: number): Promise<any[]>;
}
