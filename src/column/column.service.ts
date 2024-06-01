import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './entity/column.entity';
import { Repository } from 'typeorm';
import { UpdateColumnDto } from './dtos/update-column.dto';
import { CreateColumnDto } from './dtos/CreateCoumn.dto';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnEntity) private columnRepository: Repository<ColumnEntity>
    ) {}

    async getColumById(id: string): Promise<ColumnEntity> {
        return await this.columnRepository.findOne({ where: { id: id }, relations: ['user', 'cards'] })
    }

    async getUsersColumnsByUserId(id: string): Promise<ColumnEntity[]> {
        return await this.columnRepository.find({ where: { user: { id: id } }, relations: ['user', 'cards'] })
    }

    async createColumn(@Body() createColumnData: CreateColumnDto): Promise<ColumnEntity> {
        const createdColumn = this.columnRepository.create(createColumnData)
        return await this.columnRepository.save(createdColumn)
    }

    async deleteUsersColumn(userId: string, columnId: string): Promise<ColumnEntity> {
        const column = await this.columnRepository.findOne({ where: { user: { id: userId }, id: columnId } })
        
        if (column) {
            await this.columnRepository.remove(column)

            return { ...column, id: columnId }
        } else {
            throw new NotFoundException(`Column with ID ${columnId} not found for user ${userId}`);
        }
    }

    async getUsersColumns(userId: string): Promise<ColumnEntity[]> {
        return await this.columnRepository.find({ where: { user: { id: userId } }, relations: ['user', 'cards'] })
    }

    async updateUsersColumn(columId: string, updateColumnData: UpdateColumnDto): Promise<ColumnEntity> {
        const necessaryColumn = await this.getColumById(columId)

        if (!necessaryColumn) throw new NotFoundException()
        
        const updatedColumn = this.columnRepository.merge(necessaryColumn, updateColumnData)
        return await this.columnRepository.save(updatedColumn)
    }
}
