export class LoginDto {
    username: string;
    password: string;
}

export class AddUserDto {
    name: string;
    username: string;
    password: string;
    id_user_type: number;
    id_group: number;
}

export class ChangePasswordDto {
    new_password: string;
}

export class ChangeUserTypeDto {
    id_user_type: number;
}