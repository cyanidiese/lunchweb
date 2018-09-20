import {Translation} from './translation';

export class Category {

    id: number;
    providerId: number;
    title: Translation;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
