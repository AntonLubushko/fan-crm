import { Injectable } from '@nestjs/common';
import { ShoppingListItem } from './shopping-list-item.model';
import { ShoppingList } from 'src/shopping-list/shopping-list.model';
import { User } from 'src/user/user.model';
type whereClauseType = { id?: number; userId?: number };
type ConditionsType = { where?: whereClauseType; include?: any[] };

@Injectable()
export class ShoppingListItemsRepository {
  constructor() {}

  async getShoppingListItems(userId: number): Promise<ShoppingListItem[]> {
    const options = {
      model: ShoppingList,
      include: [
        {
          model: ShoppingListItem,
        },
      ],
    };

    const conditions: ConditionsType = this.composeConditions(userId, options);
    const user = await User.findOne(conditions);

    // Получаем все ShoppingListItems для всех списков пользователя
    const shoppingListItems = user.shoppingLists.flatMap(
      (shoppingList) => shoppingList.items,
    );

    return shoppingListItems;
  }

  private composeConditions(userId?: number, options = {}): ConditionsType {
    const whereClause: whereClauseType = {
      ...(userId != null && { id: userId }),
    };
    return {
      where: Object.keys(whereClause).length ? whereClause : undefined,
      include: Object.keys(options).length ? [options] : undefined,
    };
  }
}
