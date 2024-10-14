import { IUser } from 'libs/interfaces/src';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> implements IUser {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  phone: string;
}
