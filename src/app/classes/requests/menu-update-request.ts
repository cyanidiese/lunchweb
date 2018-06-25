import {ObjectCounter} from './object-counter';

export class MenuUpdateRequest {

  deliveryTime: string;
  deadline: string;
  dishes: ObjectCounter[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
