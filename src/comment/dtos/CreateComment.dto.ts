import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { CardEntity } from "src/card/entity/card.entity";

export class CreateCommentDto {
    @ApiProperty({ description: 'The name of the comment author', type: 'string' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({ description: 'The body of the comment', type: 'string' })
    @IsString()
    @IsNotEmpty()
    body: string;

    // @ApiProperty({ description: 'The creation date of the comment', type: 'string', format: 'date-time', required: false })
    @IsDate()
    @IsOptional()
    createdAt: Date;

    @ApiProperty({ description: 'The card associated with the comment', type: 'string'  })
    @IsString()
    @IsNotEmpty()
    card: CardEntity;
}