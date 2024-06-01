import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UsersEntity } from "src/users/entity/users.entities";

export class UpdateColumnDto {

    @ApiProperty({ description: 'The name of the column', type: 'string' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    // @ApiProperty({ description: 'The creation date of the column', type: 'string', format: 'date-time', required: false })
    @IsDate()
    @IsOptional()
    createdAt: Date;

    @ApiProperty({ description: 'The user associated with the column', type: 'string' })
    @IsString()
    @IsNotEmpty()
    user: UsersEntity;
}