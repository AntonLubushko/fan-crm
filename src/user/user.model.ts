import { IUser } from 'libs/interfaces/src';
import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ShoppingList } from 'src/shopping-list/shopping-list.model';

@Table
export class User extends Model<User> implements IUser {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @HasMany(() => ShoppingList)
  shoppingLists: ShoppingList[];
}
