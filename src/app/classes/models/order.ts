import {MenuItem} from './menu-item';
import {User} from './user';

export class Order {

  id: number;
  userId: number;
  itemId: number;
  orderedCount: number;
  price: number;
  date: string;
  item: MenuItem;
  master: User;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
