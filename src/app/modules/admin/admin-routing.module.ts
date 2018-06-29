import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrdersComponent} from './orders/orders.component';
import {LookupComponent} from './lookup/lookup.component';
import {ProvidersComponent} from './providers/providers.component';


const routes: Routes = [
    {
        path: '',
        component: OrdersComponent
    },
    {
        path: 'lookup',
        component: LookupComponent
    },
    {
        path: 'providers',
        component: ProvidersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}