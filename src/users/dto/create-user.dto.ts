import { IsEmail, IsString, Validate } from "class-validator";

export class CreateUserDto {

    @IsString()
    password: string;

    @IsEmail()
    email: string;
}
