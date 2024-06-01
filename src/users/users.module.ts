import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entities';
import { ColumnEntity } from 'src/column/entity/column.entity';
import { ColumnModule } from 'src/column/column.module';
import { ColumnService } from 'src/column/column.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity, ColumnEntity,
    ]),
    ColumnModule
  ],
  providers: [UsersService, ColumnService],
  controllers: [UsersController]
})
export class UsersModule {}
