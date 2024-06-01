import { Body, Controller, Get, Inject, Post, Req, Request, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { UsersEntity } from 'src/users/entity/users.entities';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService
    ) {}
    @Post('signUp')
    @ApiOperation({ summary: 'Sign up a new user' })
    @ApiResponse({ status: 201, description: 'The created user', type: UsersEntity })
    @ApiBody({ type: RegisterDto })
    async signUp(@Body() registrationData: RegisterDto): Promise<UsersEntity> {
        return await this.authService.signUp(registrationData)
    }

    @Post('login')
    @ApiOperation({ summary: 'Log in a user' })
    @ApiResponse({ status: 200, description: 'The logged-in user', type: UsersEntity })
    @ApiBody({ type: LoginDto })
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return await this.authService.login(req.user)
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all users from authentication' })
    @ApiResponse({ status: 200, description: 'The list of users', type: [UsersEntity] })
    @ApiBearerAuth()
    async getAllUsersFromAuth()
    {
        return await this.authService.getAllUsersFromAuth()
    }
}
