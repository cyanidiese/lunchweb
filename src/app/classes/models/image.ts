export class Image {

  id: number;
  guid: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
