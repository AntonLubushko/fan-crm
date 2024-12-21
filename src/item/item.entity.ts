import { IItem } from 'libs/interfaces/src';

export class ItemEntity implements IItem {
  id: number;
  name: string;
  price: number;

  constructor(item: IItem) {
    this.id = item.id;
    this.price = item.price;
    this.name = item.name;
  }
}
