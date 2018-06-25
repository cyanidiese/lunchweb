export class Role {

  id: number;
  name: string;
  title: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
