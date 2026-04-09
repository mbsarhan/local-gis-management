import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository.interface';

@Injectable()
export class AddUserUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: IUsersRepository,
    ) {}

    async execute(idWho: number, name: string, username: string, password: string, idUserType: number, idGroup?: number) {
        return this.usersRepository.addUser(idWho, name, username, password, idUserType, idGroup);
    }
}