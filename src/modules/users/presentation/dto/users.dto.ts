import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ type: String, example: 'admin' })
    username: string;
    @ApiProperty({ type: String, example: '123456' })
    password: string;
}

export class AddUserDto {
    @ApiProperty({ type: String, example: 'User Name' })
    name: string;
    @ApiProperty({ type: String, example: 'username' })
    username: string;
    @ApiProperty({ type: String, example: '123456' })
    password: string;
    @ApiProperty({ type: Number, example: 1 })
    id_user_type: number;
    @ApiProperty({ type: Number, example: 1 })
    id_group: number;
}

export class ChangePasswordDto {
    @ApiProperty({ type: String, example: 'new_password' })
    new_password: string;
}

export class ChangeUserTypeDto {
    @ApiProperty({ type: Number, example: 2 })
    id_user_type: number;
}
