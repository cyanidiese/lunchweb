import {Pipe, PipeTransform} from '@angular/core';

import {Order} from '../../../classes/models/order';

@Pipe({
    name: 'ordersAmount'
})
export class OrdersAmountPipe implements PipeTransform {

    transform(orders: Order[]): any {

        let amount = 0;

        if(orders && orders.length){
            for(let i = 0; i < orders.length; i++){
                amount += orders[i].orderedCount * orders[i].price;
            }
        }

        return amount

    }

}
