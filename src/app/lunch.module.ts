import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {DatePipe, DecimalPipe} from '@angular/common';
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
import {AuthApiService} from './services/api/auth.service';
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
import {UserService} from './services/api/user.service';

import {LoginComponent} from './pages/login/login.component';
import {LocStorageService} from './services/loc-storage.service';
import {GoogleAnalyticsService} from './services/google-analytics.service';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
} from "angular5-social-login";

import {ReusableModule} from './modules/reusable/reusable.module';

// Configs
export function getAuthServiceConfigs() {
    return new AuthServiceConfig(
        [
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider("1051139662842-p3ga3rf785q1k9jccuood965ei1t57et.apps.googleusercontent.com")
            },
        ]
    );
}

@NgModule({
    declarations: [
        LunchComponent,
        LoginComponent
    ],
    imports: [
        // BrowserModule.withServerTransition({appId: 'lunchapp'}),
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
            libraries: ['places'],
            apiKey: 'AIzaSyAJsBZcOzH5mWubgqRYnefsSIN9aQtAsiI' // old api key
            // apiKey: 'AIzaSyBXpbRQnxPLtJiOgIV_FumSnq-AJMFWLd4' // new api key with places
        }),
        AgmSnazzyInfoWindowModule,
        AgmJsMarkerClustererModule,
        ReusableModule,
        SocialLoginModule,
        // UcWidgetModule
    ],
    providers: [
        LocStorageService,
        GoogleAnalyticsService,
        AuthStateService,
        StateService,
        ApiService,
        AdminService,
        AuthApiService,
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
        UserService,
        DatePipe,
        DecimalPipe,
        Title,
        HttpClientModule,
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }
    ],
    bootstrap: [LunchComponent]
})
export class LunchModule {
}
