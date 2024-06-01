import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entity/column.entity';
import { UsersEntity } from 'src/users/entity/users.entities';
import { CardEntity } from 'src/card/entity/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ColumnEntity, UsersEntity,
      CardEntity
    ]),
  ],
  providers: [ColumnService],
  controllers: [ColumnController]
})
export class ColumnModule {}
