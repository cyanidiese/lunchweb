import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {MasterComponent} from './pages/master/master.component';
import {ProviderComponent} from './pages/provider/provider.component';
import {AdminComponent} from './pages/admin/admin.component';

export const lunchRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'master',
                children: [
                    {
                        path: '',
                        component: MasterComponent
                    }
                ]
            },
            {
                path: 'provider',
                children: [
                    {
                        path: '',
                        component: ProviderComponent
                    }
                ]
            },
            {
                path: 'admin',
                children: [
                    {
                        path: '',
                        component: AdminComponent
                    }
                ]
            },
            // {
            //     path: 'organizations',
            //     children: [
            //         {
            //             path: '',
            //             component: OrganizationsListPageComponent
            //         },
            //         {
            //             path: ':organizationSlug',
            //             component: OrganizationPageComponent
            //         }
            //     ]
            // }
        ]
    }
];
