import { Pipe, PipeTransform } from '@angular/core';
import {Order} from '../../../classes/models/order';

@Pipe({
  name: 'ordersWeight'
})
export class OrdersWeightPipe implements PipeTransform {

    transform(orders: Order[]): any {

        let weight = 0;

        if(orders && orders.length){
            for(let i = 0; i < orders.length; i++){
                weight += orders[i].item.dish.weight;
            }
        }

        return weight

    }

}
