import {Translation} from './translation';
import {Image} from './image';

export class Dish {

  id: number;
  categoryId: number;
  providerId: number;
  name: Translation;
  description: Translation;
  weight: number;
  calories: number;
  price: number;
  images: Image[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
