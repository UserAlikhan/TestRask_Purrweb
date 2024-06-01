import { ApiProperty } from "@nestjs/swagger";
import { ColumnEntity } from "src/column/entity/column.entity";
import { CommentEntity } from "src/comment/entity/comment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'card' })
export class CardEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique ID of the card', type: 'string' })
    id: string;

    @Column({ type: 'varchar', nullable: false })
    @ApiProperty({ description: 'The name of the card', type: 'string' })
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: 'The creation date of the card', type: 'string', format: 'date-time' })
    createdAt: Date;

    @ManyToOne((returns) => ColumnEntity, column => column.cards, { nullable: false })
    @ApiProperty({ description: 'The column associated with the card', type: () => ColumnEntity })
    column: ColumnEntity;

    @OneToMany((returns) => CommentEntity, comments => comments.card, { nullable: true })
    @ApiProperty({ description: 'The comments associated with the card', type: () => [CommentEntity] })
    comments: CommentEntity[];
}