import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemEntity } from './item.entity';
import { Item } from './item.model';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectModel(Item)
    private readonly itemModel: typeof Item,
  ) {}

  async createItem(itemEntity: ItemEntity): Promise<ItemEntity> {
    const itemModel = await this.itemModel.create({
      name: itemEntity.name,
      price: itemEntity.price,
    });

    return new ItemEntity(itemModel);
  }

  async getAllItems() {
    const itemsModels = await this.itemModel.findAll();

    if (!itemsModels) {
      return [];
    }

    return itemsModels.map((itemModel) => new ItemEntity(itemModel));
  }
}
