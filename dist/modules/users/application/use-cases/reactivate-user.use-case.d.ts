import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
export declare class ReactivateUserUseCase {
    private readonly usersRepository;
    constructor(usersRepository: IUsersRepository);
    execute(idWho: number, idUser: number): Promise<number>;
}
