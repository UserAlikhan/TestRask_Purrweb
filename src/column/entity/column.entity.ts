import { ApiProperty } from "@nestjs/swagger";
import { CardEntity } from "src/card/entity/card.entity";
import { UsersEntity } from "src/users/entity/users.entities";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'column' })
export class ColumnEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique ID of the column', type: 'string' })
    id: string;

    @Column({ type: 'varchar', nullable: false })
    @ApiProperty({ description: 'The name of the column', type: 'string' })
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: 'The creation date of the column', type: 'string', format: 'date-time' })
    createdAt: Date;

    @ManyToOne((returns) => UsersEntity, users => users.columns, { nullable: false })
    @ApiProperty({ description: 'The user associated with the column', type: () => UsersEntity })
    user: UsersEntity;

    @OneToMany((returns) => CardEntity, cards => cards.column, { nullable: true })
    @ApiProperty({ description: 'The cards associated with the column', type: [CardEntity] })
    cards: CardEntity[];   
}