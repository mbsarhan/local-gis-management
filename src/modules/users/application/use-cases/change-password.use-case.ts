import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository.interface';

@Injectable()
export class ChangePasswordUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: IUsersRepository,
    ) {}

    async execute(idWho: number, idUser: number, newPassword: string) {
        return this.usersRepository.changePassword(idWho, idUser, newPassword);
    }
}