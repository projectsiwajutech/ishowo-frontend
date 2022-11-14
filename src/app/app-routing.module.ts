import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/connection',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'stocks',
        loadChildren: () => import('./components/pages/stock/stocks.module').then(module => module.StocksModule)
      },
      {
        path: 'ventes',
        loadChildren: () => import('./components/pages/ventes/ventes.module').then(module => module.VentesModule)
      },
      {
        path: 'parametres',
        loadChildren: () => import('./components/pages/params/params.module').then(module => module.ParamsModule)
      },
      {
        path: 'securite',
        loadChildren: () => import('./components/pages/security/security.module').then(module => module.SecurityModule)
      },
      {
        path: 'finances',
        loadChildren: () => import('./components/pages/finances/finances.module').then(module => module.FinancesModule)
      },
      {
        path: 'statistiques',
        loadChildren: () => import('./components/pages/stats/stats.module').then(module => module.StatsModule)
      },

    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./components/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
