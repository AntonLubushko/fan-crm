import { IShoppingList } from 'libs/interfaces/src';

export class ShoppingListEntity implements IShoppingList {
  id: number;
  name: string;
  userId: number;
  items?: Array<{
    id: number;
    shoppingListId: number;
    itemId: number;
    quantity: number;
  }>;

  constructor(list: IShoppingList) {
    this.id = list.id;
    this.userId = list.userId;
    this.name = list.name;
    this.items = list.items;
  }
}
