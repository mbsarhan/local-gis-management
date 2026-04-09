export declare class LoginDto {
    username: string;
    password: string;
}
export declare class AddUserDto {
    name: string;
    username: string;
    password: string;
    id_user_type: number;
    id_group: number;
}
export declare class ChangePasswordDto {
    new_password: string;
}
export declare class ChangeUserTypeDto {
    id_user_type: number;
}
