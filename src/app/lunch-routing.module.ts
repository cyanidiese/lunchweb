import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {lunchRoutes} from './lunch.routes';


@NgModule({
    imports: [RouterModule.forRoot(lunchRoutes)],
    exports: [RouterModule],
    providers: []
})
export class LunchRoutingModule {
}
