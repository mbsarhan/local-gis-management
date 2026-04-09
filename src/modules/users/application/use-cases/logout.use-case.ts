import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository.interface';

@Injectable()
export class LogoutUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: IUsersRepository,
    ) {}

    async execute(userId: number) {
        // Clear the refresh token from DB — invalidates the session completely
        await this.usersRepository.clearRefreshToken(userId);
        return { message: 'Logged out successfully' };
    }
}