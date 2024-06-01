import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entity/card.entity';
import { ColumnEntity } from 'src/column/entity/column.entity';
import { CommentEntity } from 'src/comment/entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CardEntity, ColumnEntity,
      CommentEntity
    ])
  ],
  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}
