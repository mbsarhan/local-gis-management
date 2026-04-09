import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
export declare class ChangeUserTypeUseCase {
    private readonly usersRepository;
    constructor(usersRepository: IUsersRepository);
    execute(idWho: number, idUser: number, idUserType: number): Promise<number>;
}
