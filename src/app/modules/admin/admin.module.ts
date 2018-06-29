import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from './orders/orders.component';
import {AdminRoutingModule} from './admin-routing.module';
import {ReusableModule} from '../reusable/reusable.module';
import {HeaderComponent} from './_partials/header/header.component';
import {LookupComponent} from './lookup/lookup.component';
import {ProvidersComponent} from './providers/providers.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReusableModule
    ],
    declarations: [OrdersComponent, HeaderComponent, LookupComponent, ProvidersComponent]
})
export class AdminModule {
}
