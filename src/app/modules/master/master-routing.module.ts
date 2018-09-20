import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OrdersComponent} from './orders/orders.component';
import {MenuComponent} from './menu/menu.component';
import {StatsComponent} from './stats/stats.component';


const routes: Routes = [
    {
        path: '',
        component: MenuComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'stats',
        component: StatsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }