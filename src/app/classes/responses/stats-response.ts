export class StatsResponse {

  calories: number;
  price: number;
  weight: number;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
