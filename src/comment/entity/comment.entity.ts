import { ApiProperty } from "@nestjs/swagger";
import { CardEntity } from "src/card/entity/card.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comment' })
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique ID of the comment', type: 'string' })
    id: string;

    @Column({ type: 'varchar', nullable: false })
    @ApiProperty({ description: 'The name of the comment', type: 'string' })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    @ApiProperty({ description: 'The body of the comment', type: 'string' })
    body: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: 'The creation date of the comment', type: 'string', format: 'date-time' })
    createdAt: Date;

    @ManyToOne((returns) => CardEntity, card => card.comments, { nullable: false })
    @ApiProperty({ description: 'The card associated with the comment', type: () => CardEntity })
    card: CardEntity;
}