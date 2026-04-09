import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
export declare class DeactivateUserUseCase {
    private readonly usersRepository;
    constructor(usersRepository: IUsersRepository);
    execute(idWho: number, idUser: number): Promise<number>;
}
