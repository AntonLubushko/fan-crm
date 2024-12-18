import { Injectable } from '@nestjs/common';
import { ShoppingListItem } from './shopping-list-item.model';
import { ShoppingList } from 'src/shopping-list/shopping-list.model';
import { User } from 'src/user/user.model';
import { ShoppingListItemEntity } from './shopping-list-item.entity';
import { WhereClause, Options, Conditions } from 'libs/types/db.list.params';

@Injectable()
export class ShoppingListItemsRepository {
  constructor() {}

  async getShoppingListItems(
    userId: number,
  ): Promise<ShoppingListItemEntity[]> {
    const options: Options<typeof ShoppingList, typeof ShoppingListItem> = {
      model: ShoppingList,
      include: [
        {
          model: ShoppingListItem,
        },
      ],
    };

    const conditions: Conditions<typeof ShoppingList, typeof ShoppingListItem> =
      this.composeConditions<typeof ShoppingList, typeof ShoppingListItem>(
        userId,
        options,
      );
    const user = await User.findOne(conditions);

    if (!user) {
      return null;
    }

    const shoppingListItems = user.shoppingLists.flatMap((shoppingList) =>
      shoppingList.items.map(
        (listItem) => new ShoppingListItemEntity(listItem, user.id),
      ),
    );

    return shoppingListItems;
  }

  private composeConditions<T, U>(
    userId?: number,
    options: Options<T, U> = {},
  ): Conditions<T, U> {
    const whereClause: WhereClause = {
      ...(userId != null && { id: userId }),
    };

    return {
      where: Object.keys(whereClause).length ? whereClause : undefined,
      include: Object.keys(options).length ? [options] : undefined,
    };
  }
}
