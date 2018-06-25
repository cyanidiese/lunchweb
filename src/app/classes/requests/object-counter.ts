export class ObjectCounter {

  id: number;
  count: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
