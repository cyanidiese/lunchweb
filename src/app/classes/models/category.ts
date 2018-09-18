import {Translation} from './translation';

export class Category {

    id: number;
    title: Translation;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
