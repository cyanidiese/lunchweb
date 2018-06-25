export class NotificationRequest {

  message: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
