import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(2)
    firstname: string;

    @IsString()
    @IsOptional()
    lastname?: string;

    @IsString()
    @MinLength(6)
    password: string;
}
