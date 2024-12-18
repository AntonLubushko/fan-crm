import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingList } from './shopping-list.model';
import { ShoppingListEntity } from './shopping-list.entity';
import { Options, WhereClause, Conditions } from 'libs/types/db.list.params';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.model';

@Injectable()
export class ShoppingListRepository {
  constructor(
    @InjectModel(ShoppingList)
    private readonly shoppingListModel: typeof ShoppingList,
  ) {}

  async getShoppingList(
    listId?: number,
    userId?: number,
  ): Promise<ShoppingListEntity> {
    const options: Options<typeof ShoppingListItem> = {
      model: ShoppingListItem,
    };
    const conditions: Conditions<typeof ShoppingListItem> =
      this.composeConditions<typeof ShoppingListItem>(listId, userId, options);

    const listModel = await this.shoppingListModel.findOne(conditions);

    if (!listModel) {
      return null;
    }

    const listEntity = new ShoppingListEntity(listModel);

    return listEntity;
  }

  async getShoppingLists(
    listId?: number,
    userId?: number,
  ): Promise<ShoppingListEntity[]> {
    const conditions: Conditions = this.composeConditions(listId, userId);
    const listsModels = await this.shoppingListModel.findAll(conditions);
    if (!listsModels) {
      return [];
    }
    return listsModels.map((listModel) => new ShoppingListEntity(listModel));
  }

  async createShoppingList(userId): Promise<ShoppingListEntity> {
    const listModel = await this.shoppingListModel.create({
      name:
        'Shopping_List_' + (Number(await this.shoppingListModel.max('id')) + 1),
      userId: userId,
    });

    return new ShoppingListEntity(listModel);
  }

  async removeShoppingList(listId: number, userId?: number): Promise<number> {
    const conditions: Conditions = this.composeConditions(listId, userId);
    return await this.shoppingListModel.destroy(conditions);
  }

  private composeConditions<T>(
    listId?: number,
    userId?: number,
    options: Options<T> = {},
  ): Conditions<T> {
    const whereClause: WhereClause = {
      ...(listId != null && { id: listId }),
      ...(userId != null && { userId }),
    };

    return {
      where: Object.keys(whereClause).length ? whereClause : undefined,
      include: Object.keys(options).length ? [options] : undefined,
    };
  }
}
