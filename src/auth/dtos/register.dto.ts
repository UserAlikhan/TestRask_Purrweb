import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UsersRolesEnum } from "src/users/enum/roles.enum";


export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'The Email of the User', type: 'string' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({ description: 'The Username of the user', type: 'string' })
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({ description: 'The password of the user', type: 'string' })
    password: string;

    @IsOptional()
    @IsEnum(UsersRolesEnum)
    @ApiPropertyOptional({ description: 'The role of the user'})
    role: UsersRolesEnum;

    @IsOptional()
    @IsDate()
    // @ApiPropertyOptional({ description: 'Date of creation of the user account' })
    createdAt: Date;
}