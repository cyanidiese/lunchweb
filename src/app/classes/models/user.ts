import {Office} from './office';
import {Role} from './role';
import {Image} from './image';

export class User {

    id: number;
    firstName: string;
    lastName: string;
    alias: string;
    email: string;
    isProvider: boolean;
    isShop: boolean;
    providerId: number;
    officeId: number;
    office: Office;
    role: Role;
    image: Image;
    timezone: string;
    lang: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
