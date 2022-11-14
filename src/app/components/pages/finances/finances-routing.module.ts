import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardF1Guard } from '../guards/F1/guard-f1.guard';
import { GuardF2Guard } from '../guards/F2/guard-f2.guard';
import { GuardF3Guard } from '../guards/F3/guard-f3.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'banks',
        canLoad : [GuardF1Guard],
        canActivate : [GuardF1Guard],
        loadChildren: () => import('./banks/list/banks.module').then(module => module.BanksModule)
      },
      {
        path: 'vaccounts',
        canLoad : [GuardF2Guard],
        canActivate : [GuardF2Guard],
        loadChildren: () => import('./virtualaccounts/list/vaccounts.module').then(module => module.VaccountsModule)
      },
      {
        path: 'operations',
        canLoad : [GuardF3Guard],
        canActivate : [GuardF3Guard],
        loadChildren: () => import('./operations/list/operations.module').then(module => module.OperationsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancesRoutingModule { }
