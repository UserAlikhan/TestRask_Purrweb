import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { UsersEntity } from './users/entity/users.entities';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants/constant';
import { CommentEntity } from './comment/entity/comment.entity';
import { ColumnEntity } from './column/entity/column.entity';
import { CardEntity } from './card/entity/card.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass',
      database: 'TestTaskPurrweb',
      entities: [UsersEntity, CommentEntity, ColumnEntity, CardEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UsersEntity, CommentEntity, ColumnEntity, CardEntity]),
    UsersModule,
    ColumnModule,
    CardModule,
    CommentModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
