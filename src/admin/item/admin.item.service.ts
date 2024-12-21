import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dtos/create.item.dto';
import { ItemEntity } from 'src/item/item.entity';
import { ItemRepository } from 'src/item/item.repository';

@Injectable()
export class AdminItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async createItem({ name, price }: CreateItemDto): Promise<ItemEntity> {
    const newItem = <ItemEntity>{ name, price };
    const item = await this.itemRepository.createItem(newItem);
    return item;
  }

  async getAllItems() {
    return this.itemRepository.getAllItems();
  }
}
