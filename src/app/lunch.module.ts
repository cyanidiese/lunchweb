import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {DatePipe, DecimalPipe} from "@angular/common";
import {LocalStorageModule} from 'angular-2-local-storage';


import {AgmCoreModule} from '@agm/core';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';

import {LunchRoutingModule} from './lunch-routing.module';

import {LunchComponent} from './lunch.component';

import {AuthStateService} from './services/auth-state.service';
import {StateService} from './services/state.service';
import {ApiService} from './services/api.service';
import {AdminService} from './services/api/admin.service';
import {AuthService} from './services/api/auth.service';
import {CategoriesService} from './services/api/categories.service';
import {CommentsService} from './services/api/comments.service';
import {DishesService} from './services/api/dishes.service';
import {FavoritesService} from './services/api/favorites.service';
import {MasterService} from './services/api/master.service';
import {MenusService} from './services/api/menus.service';
import {NotificationsService} from './services/api/notifications.service';
import {OfficesService} from './services/api/offices.service';
import {OrdersService} from './services/api/orders.service';
import {ProvidersService} from './services/api/providers.service';

import { LoginComponent } from './pages/login/login.component';
import {LocStorageService} from './services/loc-storage.service';
import {GoogleAnalyticsService} from './services/google-analytics.service';
import { MasterComponent } from './pages/master/master.component';
import { ProviderComponent } from './pages/provider/provider.component';
import { AdminComponent } from './pages/admin/admin.component';


@NgModule({
    declarations: [
        LunchComponent,
        LoginComponent,
        MasterComponent,
        ProviderComponent,
        AdminComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'lunchapp'}),
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        HttpClientModule,
        ReactiveFormsModule,
        LunchRoutingModule,
        LocalStorageModule.withConfig({
            prefix: 'lunch',
            storageType: 'localStorage'
        }),
        AgmCoreModule.forRoot({
            libraries: ["places"],
            apiKey: 'AIzaSyAJsBZcOzH5mWubgqRYnefsSIN9aQtAsiI' // old api key
            // apiKey: 'AIzaSyBXpbRQnxPLtJiOgIV_FumSnq-AJMFWLd4' // new api key with places
        }),
        AgmSnazzyInfoWindowModule,
        AgmJsMarkerClustererModule,
    ],
    providers: [
        LocStorageService,
        GoogleAnalyticsService,
        AuthStateService,
        StateService,
        ApiService,
        AdminService,
        AuthService,
        CategoriesService,
        CommentsService,
        DishesService,
        FavoritesService,
        MasterService,
        MenusService,
        NotificationsService,
        OfficesService,
        OrdersService,
        ProvidersService,
        DatePipe,
        DecimalPipe,
        Title,
        HttpClientModule
    ],
    bootstrap: [LunchComponent]
})
export class LunchModule {
}
