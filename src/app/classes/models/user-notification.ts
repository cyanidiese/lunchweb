import {User} from './user';
import {Notification} from './notification';

export class UserNotification {

  id: number;
  userId: number;
  notificationId: number;
  isRead: boolean;
  user: User;
  notification: Notification;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
