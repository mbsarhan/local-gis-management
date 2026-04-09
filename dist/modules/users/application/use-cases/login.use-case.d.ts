import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
import { TokenService } from '../../../../shared/services/token.service';
export declare class LoginUseCase {
    private readonly usersRepository;
    private readonly tokenService;
    constructor(usersRepository: IUsersRepository, tokenService: TokenService);
    execute(username: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: any;
            name: any;
            userType: any;
        };
    }>;
}
