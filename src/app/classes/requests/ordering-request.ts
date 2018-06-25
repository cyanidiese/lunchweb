import {ObjectCounter} from './object-counter';

export class OrderingRequest {

  menuItems : ObjectCounter[]

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
