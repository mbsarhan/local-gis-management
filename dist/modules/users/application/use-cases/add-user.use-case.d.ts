import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
export declare class AddUserUseCase {
    private readonly usersRepository;
    constructor(usersRepository: IUsersRepository);
    execute(idWho: number, name: string, username: string, password: string, idUserType: number, idGroup?: number): Promise<number>;
}
