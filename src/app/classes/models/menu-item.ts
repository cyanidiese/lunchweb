import {Order} from './order';
import {Dish} from './dish';

export class MenuItem {

  id: number;
  dishId: number;
  initialCount: number;
  availableCount: number;
  price: number;
  orders: Order[];
  dish: Dish;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
