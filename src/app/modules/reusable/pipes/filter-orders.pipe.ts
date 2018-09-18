import {Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment-timezone';

import {Order} from '../../../classes/models/order';

@Pipe({
    name: 'filterOrders'
})
export class FilterOrdersPipe implements PipeTransform {

    transform(orders: Order[], masterId?: number, dishId?: number, date?: string): any {

        let result = orders.slice(0);

        if (masterId) {
            result = result.filter(order => order.master.id == masterId);
        }

        if (dishId) {
            result = result.filter(order => order.item.dish.id == dishId);
        }

        if (date) {
            result = result.filter(order => this.formatDate(order.date, 'YYYY-MM-DD') == date);
        }

        return result;
    }

    formatDate(date: Date | string, format: string): string {
        return moment(date).format(format);
    }

}
