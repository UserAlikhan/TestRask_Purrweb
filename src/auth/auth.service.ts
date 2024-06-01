import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import * as bcrpyt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entity/users.entities';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email)

        const valid = await bcrpyt.compare(password, user?.password)

        if (user && valid) {
            return user
        }

        return null
    }

    async validateUserById(id: string) {
        console.log('id ', id)
        return await this.usersRepository.findOne({ where: { id: id } })
    }

    async signUp(registrationData: RegisterDto): Promise<UsersEntity> {
        const hashedPassword = await bcrpyt.hash(registrationData.password, 10)
        const createdUser = this.usersRepository.create({
            ...registrationData,
            password: hashedPassword
        })
        return await this.usersRepository.save(createdUser)
    }

    async login(user: UsersEntity) {
        const payload = { email: user.email, password: user.password, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload),
            user: user
        }
    }

    async getAllUsersFromAuth() {
        return await this.usersRepository.find()
    }
}
