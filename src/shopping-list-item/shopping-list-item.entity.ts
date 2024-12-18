import { IShoppingListItem } from 'libs/interfaces/src';

export class ShoppingListItemEntity implements IShoppingListItem {
  id: number;
  shoppingListId: number;
  itemId: number;
  quantity: number;
  userId?: number;

  constructor(listItem: IShoppingListItem, userId?: number) {
    this.id = listItem.id;
    this.shoppingListId = listItem.shoppingListId;
    this.itemId = listItem.itemId;
    this.quantity = listItem.quantity;
    this.userId = userId;
  }
}
