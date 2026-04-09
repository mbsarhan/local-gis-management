import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
export declare class ChangePasswordUseCase {
    private readonly usersRepository;
    constructor(usersRepository: IUsersRepository);
    execute(idWho: number, idUser: number, newPassword: string): Promise<number>;
}
