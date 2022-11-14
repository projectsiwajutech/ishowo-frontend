import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardST1Guard } from '../guards/ST1/guard-st1.guard';
import { GuardST2Guard } from '../guards/ST2/guard-st2.guard';
import { GuardST3Guard } from '../guards/ST3/guard-st3.guard';
import { GuardST4Guard } from '../guards/ST4/guard-st4.guard';
import { GuardST5Guard } from '../guards/ST5/guard-st5.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'globalStats',
        canLoad : [GuardST1Guard],
        canActivate : [GuardST1Guard],
        loadChildren: () => import('./general-stats/general-stats.module').then(module => module.GeneralStatsModule)
      },
      {
        path: 'productStats',
        canLoad : [GuardST2Guard],
        canActivate : [GuardST2Guard],
        loadChildren: () => import('./product-global-stats/product-global-stats.module').then(module => module.ProductGlobalStatsModule)
      },
      {
        path: 'productSoldStats',
        canLoad : [GuardST3Guard],
        canActivate : [GuardST3Guard],
        loadChildren: () => import('./product-sold-stats/product-sold-stats.module').then(module => module.ProductSoldStatsModule)
      },
      {
        path: 'sellersStats',
        canLoad : [GuardST4Guard],
        canActivate : [GuardST4Guard],
        loadChildren: () => import('./sellers-sales-stats/sellers-sales-stats.module').then(module => module.SellersSalesStatsModule)
      },
      {
        path: 'customersStats',
        canLoad : [GuardST5Guard],
        canActivate : [GuardST5Guard],
        loadChildren: () => import('./customers-sales-stats/customers-sales-stats.module').then(module => module.CustomersSalesStatsModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
