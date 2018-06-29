import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';

export const lunchRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'admin',
                loadChildren: 'app/modules/admin/admin.module#AdminModule'
            },
            {
                path: 'provider',
                loadChildren: 'app/modules/provider/provider.module#ProviderModule'
            },
            {
                path: 'master',
                loadChildren: 'app/modules/master/master.module#MasterModule'
            },
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full'
            }
        ]
    }
];
