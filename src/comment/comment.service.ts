import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './entity/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCommentDto } from './dtos/UpdateComment.dto';
import { CreateCommentDto } from './dtos/CreateComment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>
    ) {}

    async getUsersComments(userId: string, commentId: string): Promise<CommentEntity[]> {
        return await this.commentRepository.find({ where: { id: commentId, card: { column: { user: { id: userId } } } } })
    }

    async getUsersComment(userId: string, commentId: string): Promise<CommentEntity> {
        return await this.commentRepository.findOne({ where: { id: commentId, card: { column: { user: { id: userId } } } } })
    }

    async createComment(createCommentData: CreateCommentDto): Promise<CommentEntity> {
        return await this.commentRepository.save(createCommentData)
    }

    async updateUsersComment(
        userId: string, commentId: string, 
        updateCommentData: UpdateCommentDto
    ): Promise<CommentEntity> {
        const usersComment = await this.getUsersComment(userId, commentId)

        if (!usersComment) throw new NotFoundException()
        
        const updatedComment = this.commentRepository.merge(usersComment, updateCommentData)
        return await this.commentRepository.save(updatedComment)
    }

    async deleteUsersComment(
        userId: string, commentId: string, 
    ): Promise<CommentEntity> {
        const usersComment = await this.getUsersComment(userId, commentId)
        return await this.commentRepository.remove(usersComment)
    }
}
