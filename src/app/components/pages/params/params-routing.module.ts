import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardCliGuard } from '../guards/CLI/guard-cli.guard';
import { GuardF1Guard } from '../guards/F1/guard-f1.guard';
import { GuardP1Guard } from '../guards/P1/guard-p1.guard';
import { GuardP2Guard } from '../guards/P2/guard-p2.guard';
import { GuardP3Guard } from '../guards/P3/guard-p3.guard';
import { GuardP4Guard } from '../guards/P4/guard-p4.guard';
import { GuardP5Guard } from '../guards/P5/guard-p5.guard';
import { GuardP6Guard } from '../guards/P6/guard-p6.guard';
import { GuardP7Guard } from '../guards/P7/guard-p7.guard';
import { GuardP8Guard } from '../guards/P8/guard-p8.guard';
import { GuardP9Guard } from '../guards/P9/guard-p9.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'agencies',
        // canLoad : [GuardP1Guard],
        // canActivate : [GuardF1Guard],
        loadChildren: () => import('./agencies/list/agencies.module').then(module => module.ParamsModule)
      },
      {
        path: 'categories',
        canLoad : [GuardP2Guard],
        canActivate : [GuardP2Guard],
        loadChildren: () => import('./categories/list/categories.module').then(module => module.ParamsModule)
      },
      {
        path: 'suppliers',
        canLoad : [GuardP5Guard],
        canActivate : [GuardP5Guard],
        loadChildren: () => import('./suppliers/list/suppliers.module').then(module => module.ParamsModule)
      },
      {
        path: 'logs',
        canLoad : [GuardP8Guard],
        canActivate : [GuardP8Guard],
        loadChildren: () => import('./logs/list/logs.module').then(module => module.ParamsModule)
      },
      {
        path: 'compartments',
        canLoad : [GuardP3Guard],
        canActivate : [GuardP3Guard],
        loadChildren: () => import('./compartments/list/compartments.module').then(module => module.ParamsModule)
      },
      {
        path: 'saletargets',
        canLoad : [GuardP6Guard],
        canActivate : [GuardP6Guard],
        loadChildren: () => import('./saletargets/list/saletargets.module').then(module => module.ParamsModule)
      },
      {
        path: 'measuretypes',
        canLoad : [GuardP4Guard],
        canActivate : [GuardP4Guard],
        loadChildren: () => import('./measuretypes/list/measuretypes.module').then(module => module.ParamsModule)
      },
      {
        path: 'products',
        canLoad : [GuardP7Guard],
        canActivate : [GuardP7Guard],
        loadChildren: () => import('./products/list/products.module').then(module => module.ParamsModule)
      },
      {
        path: 'customers',
        canLoad : [GuardCliGuard],
        canActivate : [GuardCliGuard],
        loadChildren: () => import('./customers/list/customers.module').then(module => module.ParamsModule)
      },
      {
        path: 'paramMecef',
        canLoad : [GuardP9Guard],
        canActivate : [GuardP9Guard],
        loadChildren: () => import('./mecef/view/param-mecef.module').then(module => module.ParamMecefModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
