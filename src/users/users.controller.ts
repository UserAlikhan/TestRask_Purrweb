import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersEntity } from './entity/users.entities';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dtos/CreateUser.dto';
import { UpdateUsersDto } from './dtos/UpdateUser.dto';
import { ColumnService } from 'src/column/column.service';
import { ColumnEntity } from 'src/column/entity/column.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnershipGuard } from './guards/columnOwnership.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(
        @Inject(UsersService) private readonly usersService: UsersService,
        @Inject(ColumnService) private readonly columnService: ColumnService
    ) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get All Users' })
    @ApiResponse({ status: 200, description: 'List of Users', type: [UsersEntity] })
    @ApiResponse({ status: 404, description: 'Users not found' })
    @ApiBearerAuth()
    async getAllUsers(): Promise<UsersEntity[]> {
        return await this.usersService.getAllUsers()
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'The user', type: UsersEntity })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'id', description: 'The ID of the user', type: 'string' })
    @ApiBearerAuth()
    async getUserById(@Param('id') id: string): Promise<UsersEntity> {
        return await this.usersService.getUserById(id)
    }
    
    @Get(':id/columns')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({ summary: 'Get a user\'s columns by ID' })
    @ApiResponse({ status: 200, description: 'The user\'s columns', type: [ColumnEntity] })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'id', description: 'The ID of the user', type: 'string' })
    @ApiBearerAuth()
    async getUsersColumns(@Param('id') id: string): Promise<ColumnEntity[]> {
        return await this.columnService.getUsersColumnsByUserId(id)
    }

    // @Post()
    // @UseGuards(JwtAuthGuard)
    // @ApiOperation({ summary: 'Create a new user' })
    // @ApiResponse({ status: 201, description: 'The created user', type: UsersEntity })
    // @ApiBody({ type: CreateUsersDto })
    // @ApiBearerAuth()
    // async createUser(@Body() createUserData: CreateUsersDto): Promise<UsersEntity> {
    //     return await this.usersService.createUser(createUserData)
    // }

    @Put(':id')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'The updated user', type: UsersEntity })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'id', description: 'The ID of the user', type: 'string' })
    @ApiBody({ type: UpdateUsersDto })
    @ApiBearerAuth()
    async updateUser(@Param('id') id: string, @Body() updateUserData: UpdateUsersDto): Promise<UsersEntity> {
        return await this.usersService.updateUser(id, updateUserData)
    }
    
    @Delete(':id')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 200, description: 'The deleted user', type: UsersEntity })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'id', description: 'The ID of the user', type: 'string' })
    @ApiBearerAuth()
    async deleteUser(@Param('id') id: string): Promise<UsersEntity> {
        return await this.usersService.deleteUser(id)
    }

    @Delete(':id/columns/:columnId')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a user\'s column by ID' })
    @ApiResponse({ status: 200, description: 'The deleted column', type: ColumnEntity })
    @ApiResponse({ status: 404, description: 'Column not found' })
    @ApiParam({ name: 'id', description: 'The ID of the user', type: 'string' })
    @ApiParam({ name: 'columnId', description: 'The ID of the column', type: 'string' })
    @ApiBearerAuth()
    async deleteUsersColumn(
        @Param('id') id: string, 
        @Param('columnId') columnId: string
    ): Promise<ColumnEntity> {
        return await this.columnService.deleteUsersColumn(id, columnId)
    }
}
