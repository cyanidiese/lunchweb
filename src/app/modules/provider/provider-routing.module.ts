import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OrdersComponent} from './orders/orders.component';
import {MenuComponent} from './menu/menu.component';
import {DishesComponent} from './dishes/dishes.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
    {
        path: '',
        component: OrdersComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: 'dishes',
        component: DishesComponent
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
export class ProviderRoutingModule { }