export class GeneralResponse {

  name: string;
  message: string;
  status: number;
  data: any;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
