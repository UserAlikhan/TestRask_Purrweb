import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './entity/card.entity';
import { Repository } from 'typeorm';
import { UpdateCardDto } from './dtos/update-card.dto';
import { CreateCardDto } from './dtos/CreateCard.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity) private cardRepository: Repository<CardEntity>
    ) {}

    async getUsersCards(userId: string, cardId: string): Promise<CardEntity[]> {
        return await this.cardRepository.find({ where: { id: cardId, column: { user: { id: userId } } } })
    }

    async getUsersCard(userId: string, cardId: string): Promise<CardEntity> {
        return await this.cardRepository.findOne({ where: { id: cardId, column: { user: { id: userId } } } })
    } 

    async createCard(createCardData: CreateCardDto): Promise<CardEntity> {
        const createCard = this.cardRepository.create(createCardData)
        return await this.cardRepository.save(createCard)
    }

    async updateUsersCard(userId: string, cardId: string, updateCardData: UpdateCardDto): Promise<CardEntity> {
        const usersCard = await this.getUsersCard(userId, cardId)

        if (!usersCard) throw new NotFoundException()

        const updatedCard = this.cardRepository.merge(usersCard, updateCardData)
        return await this.cardRepository.save(updateCardData)
    }

    async deleteUsersCard(userId: string, cardId: string): Promise<CardEntity> {
        const usersCard = await this.getUsersCard(userId, cardId)
        return await this.cardRepository.remove(usersCard)
    }
}
