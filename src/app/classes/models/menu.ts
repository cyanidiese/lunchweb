import {MenuItem} from './menu-item';

export class Menu {

  id: number;
  date: string;
  time: string;
  deadline: string;
  items: MenuItem[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
