import {UserNotification} from './user-notification';

export class Notification {

  id: number;
  ownerId: number;
  body: string;
  isApproved: boolean;
  userNotes: UserNotification[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
