import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingList } from './shopping-list.model';
type whereClauseType = { id?: number; userId?: number };
type ConditionsType = { where?: whereClauseType; include?: any[] };

@Injectable()
export class ShoppingListRepository {
  constructor(
    @InjectModel(ShoppingList)
    private readonly shoppingListModel: typeof ShoppingList,
  ) {}

  async getShoppingList(
    id: number,
    userId?: number,
    options = {},
  ): Promise<ShoppingList> {
    const conditions: ConditionsType = this.composeConditions(
      id,
      userId,
      options,
    );

    const list = await ShoppingList.findOne(conditions);
    return list || null;
  }

  async createShoppingList(userId): Promise<ShoppingList> {
    return await ShoppingList.create({
      name: 'Shopping_List_' + (Number(await ShoppingList.max('id')) + 1),
      userId: userId,
    });
  }

  async removeShoppingList(id: number, userId?: number): Promise<number> {
    const conditions: ConditionsType = this.composeConditions(id, userId);
    return await ShoppingList.destroy(conditions);
  }

  private composeConditions(
    listId: number,
    userId?: number,
    options = {},
  ): ConditionsType {
    const whereClause: whereClauseType = {
      ...(listId != null && { id: listId }),
      ...(userId != null && { userId }),
    };
    return {
      where: Object.keys(whereClause).length ? whereClause : undefined,
      include: Object.keys(options).length ? [options] : undefined,
    };
  }
}
