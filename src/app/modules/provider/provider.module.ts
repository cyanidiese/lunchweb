import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from './orders/orders.component';
import {DishesComponent} from './dishes/dishes.component';
import {MenuComponent} from './menu/menu.component';

import {ProviderRoutingModule} from './provider-routing.module';
import {ReusableModule} from '../reusable/reusable.module';
import { HeaderComponent } from './_partials/header/header.component';
import {LookupComponent} from './lookup/lookup.component';

@NgModule({
    imports: [
        CommonModule,
        ProviderRoutingModule,
        ReusableModule
    ],
    declarations: [OrdersComponent, DishesComponent, MenuComponent, LookupComponent, HeaderComponent]
})
export class ProviderModule {
}
