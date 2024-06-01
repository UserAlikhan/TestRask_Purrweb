import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { CardEntity } from './entity/card.entity';
import { UpdateCardDto } from './dtos/update-card.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersOwnershipGuard } from 'src/column/guards/usersOwnerShip.guard';
import { CreateCardDto } from './dtos/CreateCard.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('card')
export class CardController {
    constructor(
        @Inject(CardService) private readonly cardService: CardService,
    ) {}

    @Get(':userId/:cardId')
    @ApiOperation({ summary: 'Get a user\'s cards' })
    @ApiResponse({ status: 200, description: 'The user\'s cards', type: [CardEntity] })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string' })
    @ApiParam({ name: 'cardId', description: 'The ID of the card', type: 'string' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, UsersOwnershipGuard)
    async getUsersCards(@Param('userId') userId: string, @Param('cardId') cardId: string): Promise<CardEntity[]> {
        return await this.cardService.getUsersCards(userId, cardId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new card' })
    @ApiResponse({ status: 201, description: 'The created card', type: CardEntity })
    @ApiBody({ type: CreateCardDto })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async createCard(@Body() createCardData: CreateCardDto): Promise<CardEntity> {
        return await this.cardService.createCard(createCardData);
    }

    @Put(':userId/:cardId')
    @ApiOperation({ summary: 'Update a user\'s card by ID' })
    @ApiResponse({ status: 200, description: 'The updated card', type: CardEntity })
    @ApiResponse({ status: 404, description: 'Card not found' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string' })
    @ApiParam({ name: 'cardId', description: 'The ID of the card', type: 'string' })
    @ApiBody({ type: UpdateCardDto })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, UsersOwnershipGuard)
    async updateUsersCard(
        @Param('userId') userId: string,
        @Param('cardId') cardId: string,
        @Body() updateCardData: UpdateCardDto,
    ): Promise<CardEntity> {
        return await this.cardService.updateUsersCard(userId, cardId, updateCardData);
    }

    @Delete(':userId/:cardId')
    @ApiOperation({ summary: 'Delete a user\'s card by ID' })
    @ApiResponse({ status: 200, description: 'The deleted card', type: CardEntity })
    @ApiResponse({ status: 404, description: 'Card not found' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: 'string' })
    @ApiParam({ name: 'cardId', description: 'The ID of the card', type: 'string' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, UsersOwnershipGuard)
    async deleteUsersCard(@Param('userId') userId: string, @Param('cardId') cardId: string): Promise<CardEntity> {
        return await this.cardService.deleteUsersCard(userId, cardId);
    }
}