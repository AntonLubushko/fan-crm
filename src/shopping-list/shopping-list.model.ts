import { IShoppingList } from 'libs/interfaces/src/lib/shopping-list.interface';
import { User } from 'src/user/user.model';

import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.model';

@Table
export class ShoppingList extends Model<ShoppingList> implements IShoppingList {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ShoppingListItem)
  items: ShoppingListItem[];
}
