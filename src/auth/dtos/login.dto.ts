import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'The Email of the User', type: 'string' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({ description: 'The password of the user', type: 'string' })
    password: string;
}