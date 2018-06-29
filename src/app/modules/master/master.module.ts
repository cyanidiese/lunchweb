import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {ProfileComponent} from './profile/profile.component';
import {OrdersComponent} from './orders/orders.component';
import {MasterRoutingModule} from './master-routing.module';
import {ReusableModule} from '../reusable/reusable.module';
import { HeaderComponent } from './_partials/header/header.component';

@NgModule({
    imports: [
        CommonModule,
        MasterRoutingModule,
        ReusableModule
    ],
    declarations: [MenuComponent, ProfileComponent, OrdersComponent, HeaderComponent]
})
export class MasterModule {
}
