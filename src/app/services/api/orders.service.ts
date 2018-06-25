import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

import {OrderingRequest} from '../../classes/requests/ordering-request';

@Injectable()
export class OrdersService {

    constructor(private api: ApiService) {
    }

    getOrdersByDate(providerId: number, date: string) {
        return this.api.get('/master/orders/' + providerId + '/' + date);
    }

    makeOrder(providerId: number, date: string, data: OrderingRequest) {
        return this.api.post('/master/orders/' + providerId + '/' + date + '/make', [], data);
    }

}
