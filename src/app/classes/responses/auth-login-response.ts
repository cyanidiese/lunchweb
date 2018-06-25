export class AuthLoginResponse {

  success: boolean;
  statusCode: number;
  token: string;
  message: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
