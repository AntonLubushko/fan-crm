export interface IShoppingList {
  id: number;
  name: string;
  userId: number;
  items?: Array<{
    id: number;
    shoppingListId: number;
    itemId: number;
    quantity: number;
  }>;
}
