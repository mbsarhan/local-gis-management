import { LoginUseCase } from '../application/use-cases/login.use-case';
import { LogoutUseCase } from '../application/use-cases/logout.use-case';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.use-case';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.use-case';
import { AddUserUseCase } from '../application/use-cases/add-user.use-case';
import { DeactivateUserUseCase } from '../application/use-cases/deactivate-user.use-case';
import { ReactivateUserUseCase } from '../application/use-cases/reactivate-user.use-case';
import { ChangePasswordUseCase } from '../application/use-cases/change-password.use-case';
import { ChangeUserTypeUseCase } from '../application/use-cases/change-user-type.use-case';
import { LoginDto, AddUserDto, ChangePasswordDto, ChangeUserTypeDto } from './dto/users.dto';
export declare class UsersController {
    private readonly loginUseCase;
    private readonly logoutUseCase;
    private readonly refreshTokenUseCase;
    private readonly getAllUsersUseCase;
    private readonly addUserUseCase;
    private readonly deactivateUserUseCase;
    private readonly reactivateUserUseCase;
    private readonly changePasswordUseCase;
    private readonly changeUserTypeUseCase;
    constructor(loginUseCase: LoginUseCase, logoutUseCase: LogoutUseCase, refreshTokenUseCase: RefreshTokenUseCase, getAllUsersUseCase: GetAllUsersUseCase, addUserUseCase: AddUserUseCase, deactivateUserUseCase: DeactivateUserUseCase, reactivateUserUseCase: ReactivateUserUseCase, changePasswordUseCase: ChangePasswordUseCase, changeUserTypeUseCase: ChangeUserTypeUseCase);
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: any;
            name: any;
            userType: any;
        };
    }>;
    refresh(req: any): Promise<{
        access_token: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    getAllUsers(req: any): Promise<any[]>;
    addUser(req: any, dto: AddUserDto): Promise<{
        id: number;
    }>;
    deactivateUser(req: any, id: number): Promise<number>;
    reactivateUser(req: any, id: number): Promise<number>;
    changePassword(req: any, id: number, dto: ChangePasswordDto): Promise<number>;
    changeUserType(req: any, id: number, dto: ChangeUserTypeDto): Promise<number>;
}
