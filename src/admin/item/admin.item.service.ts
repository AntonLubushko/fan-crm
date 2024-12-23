import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dtos/create.item.dto';
import { ItemEntity } from 'src/item/item.entity';
import { ItemRepository } from 'src/item/item.repository';

@Injectable()
export class AdminItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async createItems(items: CreateItemDto[]): Promise<ItemEntity[]> {
    let createdItems: ItemEntity[] = [];
    for (let i = 0; i < items.length; i++) {
      createdItems.push(
        await this.itemRepository.createItem(<ItemEntity>items[i]),
      );
    }

    return createdItems;
  }

  async getAllItems() {
    return this.itemRepository.getAllItems();
  }
}
