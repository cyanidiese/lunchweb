import { Pipe, PipeTransform } from '@angular/core';
import {Order} from '../../../classes/models/order';

@Pipe({
  name: 'ordersCalories'
})
export class OrdersCaloriesPipe implements PipeTransform {

    transform(orders: Order[]): any {

        let calories = 0;

        if(orders && orders.length){
            for(let i = 0; i < orders.length; i++){
                calories += orders[i].item.dish.calories;
            }
        }

        return calories

    }

}
