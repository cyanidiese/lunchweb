import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Order} from '../../../../classes/models/order';

@Component({
    selector: 'lunch-orders-stats',
    templateUrl: './orders-stats.component.html',
    styleUrls: ['./orders-stats.component.scss']
})
export class OrdersStatsComponent implements OnInit, OnChanges {

    @Input() orders: Order[] = [];

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

}
