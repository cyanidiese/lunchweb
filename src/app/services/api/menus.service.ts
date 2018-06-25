import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

import {MenuUpdateRequest} from '../../classes/requests/menu-update-request';

@Injectable()
export class MenusService {

    constructor(private api: ApiService) {
    }

    getMenuList(providerId: number) {
        return this.api.get('/provider/' + providerId + '/menus');
    }

    getMenuByDate(providerId: number, date: string) {
        return this.api.get('/provider/' + providerId + '/menus/' + date);
    }

    cloneMenu(providerId: number, oldDate: string, newDate: string) {
        return this.api.post('/provider/' + providerId + '/menus/' + oldDate + '/clone/' + newDate);
    }

    saveMenu(providerId: number, date: string, data: MenuUpdateRequest) {
        return this.api.post('/provider/' + providerId + '/menus/' + date + '/save', [], data);
    }

    deleteMenu(providerId: number, date: string) {
        return this.api.delete('/provider/' + providerId + '/menus/' + date + '/delete');
    }
}
