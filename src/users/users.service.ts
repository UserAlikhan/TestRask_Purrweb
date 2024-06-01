import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entities';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dtos/CreateUser.dto';
import { UpdateUsersDto } from './dtos/UpdateUser.dto';
import { ColumnEntity } from 'src/column/entity/column.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>
    ) {}

    async getAllUsers(): Promise<UsersEntity[]> {
        return await this.usersRepository.find({ relations: ['columns'] })
    }

    async getUserById(id: string): Promise<UsersEntity> {
        return await this.usersRepository.findOne({ where: { id: id }, relations: ['columns']  })
    }

    async getUserByEmail(email: string): Promise<UsersEntity> {
        return await this.usersRepository.findOne({ where: { email: email } })
    }

    async createUser(createUserData: CreateUsersDto): Promise<UsersEntity> {
        const createdUser = this.usersRepository.create(createUserData)
        return await this.usersRepository.save(createdUser)
    }

    async updateUser(id: string, updateUserData: UpdateUsersDto): Promise<UsersEntity> {
        const necessaryUser = await this.getUserById(id)
        const updatedUser = this.usersRepository.merge(necessaryUser, updateUserData)
        return await this.usersRepository.save(updatedUser)
    }

    async deleteUser(id: string): Promise<UsersEntity> {
        const necessaryUser = await this.getUserById(id)
        return await this.usersRepository.remove(necessaryUser)
    }
}
