import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IItem } from 'libs/interfaces/src';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.model';

@Table
export class Item extends Model<Item> implements IItem {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  price: number;

  @HasMany(() => ShoppingListItem)
  shoppingListItems: ShoppingListItem[];
}
