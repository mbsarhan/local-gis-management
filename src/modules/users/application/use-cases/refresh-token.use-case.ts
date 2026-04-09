import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository.interface';
import { TokenService } from '../../../../shared/services/token.service';

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: IUsersRepository,
        private readonly tokenService: TokenService,
    ) {}

    async execute(userId: number, refreshToken: string) {
        // Verify the refresh token stored in DB matches what was sent
        const storedToken = await this.usersRepository.getRefreshToken(userId);

        if (!storedToken || storedToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        // Issue a new access token
        const accessToken = this.tokenService.generateAccessToken({ userId, userType: null });

        return { access_token: accessToken };
    }
}