export class AuthLoginRequest {

  email: string;
  password: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
