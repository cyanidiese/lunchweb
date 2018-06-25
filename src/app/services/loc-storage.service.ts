import {Injectable} from '@angular/core';

import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()
export class LocStorageService {

    public storage: any = {};

    constructor(private storageService: LocalStorageService) {
    }

    get(key: string){

        let value = this.storageService.get(key);

        if(!value && this.storage[key]){
            value = this.storage[key];
        }

        return value;

    }

    set(key: string, value: any){

        this.storageService.set(key, value);
        this.storage[key] = value;

    }

    remove(key: string){

        this.storageService.remove(key);
        delete this.storage[key];

    }

    usingCookies(){

        this.storageService.set('using-cookies', 'true');
        return (this.storageService.get('using-cookies') == 'true')

    }
}
