import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
import { TokenService } from '../../../../shared/services/token.service';
export declare class RefreshTokenUseCase {
    private readonly usersRepository;
    private readonly tokenService;
    constructor(usersRepository: IUsersRepository, tokenService: TokenService);
    execute(userId: number, refreshToken: string): Promise<{
        access_token: string;
    }>;
}
