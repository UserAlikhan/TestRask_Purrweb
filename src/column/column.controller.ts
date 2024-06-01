import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnEntity } from './entity/column.entity';
import { UpdateColumnDto } from './dtos/update-column.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersOwnershipGuard } from './guards/usersOwnerShip.guard';
import { CreateColumnDto } from './dtos/CreateCoumn.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('column')
export class ColumnController {
    constructor(
        @Inject(ColumnService) private readonly columnService: ColumnService,
    ) {}

    @Get(':userId')
    @ApiOperation({ summary: 'Get a user\'s columns' })
    @ApiResponse({ status: 200, description: 'The user\'s columns', type: [ColumnEntity] })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, UsersOwnershipGuard)
    async getUsersColumns(@Param('userId') userId: string): Promise<ColumnEntity[]> {
        return await this.columnService.getUsersColumns(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new column' })
    @ApiResponse({ status: 201, description: 'The created column', type: ColumnEntity })
    @ApiBearerAuth()
    @ApiBody({ type: CreateColumnDto })
    @UseGuards(JwtAuthGuard)
    async createColumn(@Body() createColumnData: CreateColumnDto): Promise<ColumnEntity> {
        return await this.columnService.createColumn(createColumnData);
    }

    @Put(':userId/:columnId')
    @ApiOperation({ summary: 'Update a user\'s column by ID' })
    @ApiResponse({ status: 200, description: 'The updated column', type: ColumnEntity })
    @ApiResponse({ status: 404, description: 'Column not found' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string' })
    @ApiParam({ name: 'columnId', description: 'The ID of the column', type: 'string' })
    @ApiBody({ type: UpdateColumnDto })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, UsersOwnershipGuard)
    async updateUsersColumn(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string,
        @Body() updateColumnData: UpdateColumnDto,
    ): Promise<ColumnEntity> {
        return await this.columnService.updateUsersColumn(columnId, updateColumnData);
    }

    @Delete(':userId/:columnId')
    @ApiOperation({ summary: 'Delete a user\'s column by ID' })
    @ApiResponse({ status: 200, description: 'The deleted column', type: ColumnEntity })
    @ApiResponse({ status: 404, description: 'Column not found' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string' })
    @ApiParam({ name: 'columnId', description: 'The ID of the column', type: 'string' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, UsersOwnershipGuard)
    async deleteUsersColumn(
        @Param('userId') userId: string,
        @Param('columnId') columnId: string,
    ): Promise<ColumnEntity> {
        return await this.columnService.deleteUsersColumn(userId, columnId);
    }
}