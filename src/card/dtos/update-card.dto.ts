import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ColumnEntity } from "src/column/entity/column.entity";

export class UpdateCardDto {

    @ApiProperty({ description: 'The name of the card', type: 'string' })
    @IsString()
    @IsNotEmpty()
    name: string;

    // @ApiProperty({ description: 'The creation date of the card', type: 'string', format: 'date-time', required: false })
    @IsDate()
    @IsOptional()
    createdAt: Date;

    @ApiProperty({ description: 'The column associated with the card', type: 'string'  })
    @IsNotEmpty()
    column: ColumnEntity;
}