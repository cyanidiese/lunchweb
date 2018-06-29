import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OrdersComponent} from './orders/orders.component';
import {MenuComponent} from './menu/menu.component';
import {ProfileComponent} from './profile/profile.component';


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
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }