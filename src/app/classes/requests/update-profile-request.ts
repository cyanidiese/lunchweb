export class UpdateProfileRequest {

  firstName: string;
  lastName: string;
  alias: string;
  password: string;
  providerId: number;
  officeId: number;
  imageGuid: string;
  timezone: string;
  language: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
