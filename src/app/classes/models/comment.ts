import {User} from './user';

export class Comment {

  id: number;
  ownerId: number;
  itemId: number;
  dishId: number;
  repliedId: number;
  body: string;
  owner: User;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
