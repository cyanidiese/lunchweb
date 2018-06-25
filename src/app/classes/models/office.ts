import {Translation} from './translation';

export class Office {

  id: number;
  title: Translation;
  phone: string;
  address: string;
  lat: number;
  lng: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
