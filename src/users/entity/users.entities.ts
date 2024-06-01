import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersRolesEnum } from "../enum/roles.enum";
import { ColumnEntity } from "src/column/entity/column.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique ID of the user', type: 'string' })
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @ApiProperty({ description: 'The email address of the user', type: 'string' })
  email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @ApiProperty({ description: 'The username of the user', type: 'string' })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ description: 'The password of the user', type: 'string' })
  password: string;

  @Column({ type: 'enum', enum: UsersRolesEnum, default: UsersRolesEnum.USER })
  @ApiProperty({ description: 'The role of the user', type: 'string', enum: UsersRolesEnum })
  role: UsersRolesEnum;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'The creation date of the user', type: 'string', format: 'date-time' })
  createdAt: Date;

  @OneToMany((returns) => ColumnEntity, columns => columns.user, { nullable: true })
  @ApiProperty({ description: 'The columns of the user', type: () => [ColumnEntity] })
  columns: ColumnEntity[];
}