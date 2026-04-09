import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
export declare class LogoutUseCase {
    private readonly usersRepository;
    constructor(usersRepository: IUsersRepository);
    execute(userId: number): Promise<{
        message: string;
    }>;
}
