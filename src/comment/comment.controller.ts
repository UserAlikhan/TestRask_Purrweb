import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from './entity/comment.entity';
import { UpdateCommentDto } from './dtos/UpdateComment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersOwnershipGuard } from 'src/column/guards/usersOwnerShip.guard';
import { CreateCommentDto } from './dtos/CreateComment.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
    constructor(
        @Inject(CommentService) private readonly commentService: CommentService
    ) {}
    
    @Get(':userId/:commentId')
    @ApiOperation({ summary: 'Get a user\'s comment by ID' })
    @ApiResponse({ status: 200, description: 'The user\'s comment', type: CommentEntity })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string' })
    @ApiParam({ name: 'commentId', description: 'The ID of the comment', type: 'string' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, UsersOwnershipGuard)
    async getUsersComments(
        @Param('userId') userId: string,
        @Param('commentId') commentId: string,
    ): Promise<CommentEntity[]> {
        return await this.commentService.getUsersComments(userId, commentId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiResponse({ status: 201, description: 'The created comment', type: CommentEntity })
    @ApiBearerAuth()
    @ApiBody({ type: CreateCommentDto })
    @UseGuards(JwtAuthGuard)
    async createComment(@Body() createCommentData: CreateCommentDto): Promise<CommentEntity> {
        return await this.commentService.createComment(createCommentData);
    }

    @Put(':userId/:commentId')
    @ApiOperation({ summary: 'Update a user\'s comment by ID' })
    @ApiResponse({ status: 200, description: 'The updated comment', type: CommentEntity })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string' })
    @ApiParam({ name: 'commentId', description: 'The ID of the comment', type: 'string' })
    @ApiBody({ type: UpdateCommentDto })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, UsersOwnershipGuard)
    async updateUsersComment(
        @Param('userId') userId: string,
        @Param('commentId') commentId: string,
        @Body() updateCommentData: UpdateCommentDto,
    ): Promise<CommentEntity> {
        return await this.commentService.updateUsersComment(userId, commentId, updateCommentData);
    }

    @Delete(':userId/:commentId')
    @ApiOperation({ summary: 'Delete a user\'s comment by ID' })
    @ApiResponse({ status: 200, description: 'The deleted comment', type: CommentEntity })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string' })
    @ApiParam({ name: 'commentId', description: 'The ID of the comment', type: 'string' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, UsersOwnershipGuard)
    async deleteUsersComment(
        @Param('userId') userId: string,
        @Param('commentId') commentId: string,
    ): Promise<CommentEntity> {
        return await this.commentService.deleteUsersComment(userId, commentId);
    }
}
