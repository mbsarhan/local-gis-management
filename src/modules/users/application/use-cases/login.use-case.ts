import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository.interface';
import { TokenService } from '../../../../shared/services/token.service';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: IUsersRepository,
        private readonly tokenService: TokenService,
    ) {}

    async execute(username: string, password: string) {
        const user = await this.usersRepository.login(username, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate both tokens
        const accessToken  = this.tokenService.generateAccessToken({
            userId:   user.u_id,
            userType: user.u_id_user_type,
        });
        const refreshToken = this.tokenService.generateRefreshToken({
            userId: user.u_id,
        });

        // Save refresh token to DB so we can invalidate it later
        await this.usersRepository.saveRefreshToken(user.u_id, refreshToken);

        return {
            access_token:  accessToken,
            refresh_token: refreshToken,
            user: {
                id:        user.u_id,
                name:      user.u_name,
                userType:  user.u_id_user_type,
            },
        };
    }
}