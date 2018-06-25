import {MenuItem} from './menu-item';
import {User} from './user';

export class Order {

  id: number;
  userId: number;
  itemId: number;
  orderedCount: number;
  item: MenuItem;
  master: User;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
