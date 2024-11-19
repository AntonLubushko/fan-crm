import { IShoppingListItem } from 'libs/interfaces/src';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Item } from 'src/item/item.model';
import { ShoppingList } from 'src/shopping-list/shopping-list.model';

@Table
export class ShoppingListItem
  extends Model<ShoppingListItem>
  implements IShoppingListItem
{
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => ShoppingList)
  @Column
  shoppingListId: number;

  @BelongsTo(() => ShoppingList)
  shoppingList: ShoppingList;

  @ForeignKey(() => Item)
  @Column
  itemId: number;

  @BelongsTo(() => Item)
  item: Item;

  @Column
  quantity: number;
}
