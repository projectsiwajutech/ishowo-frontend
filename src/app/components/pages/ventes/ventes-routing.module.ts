import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardVMGuard } from '../guards/VM/guard-vm.guard';
import { GuardVM1Guard } from '../guards/VM1/guard-vm1.guard';
import { GuardVM2Guard } from '../guards/VM2/guard-vm2.guard';
import { GuardVM3Guard } from '../guards/VM3/guard-vm3.guard';
import { GuardVM4Guard } from '../guards/VM4/guard-vm4.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'main',
        canLoad : [GuardVMGuard],
        canActivate : [GuardVMGuard],
        loadChildren: () => import('./main/main-sales.module').then(module => module.MainSalesModule)
      },
      {
        path: 'createsale',
        canLoad : [GuardVM1Guard],
        canActivate : [GuardVM1Guard],
        loadChildren: () => import('./create/sale-new.module').then(module => module.SaleNewModule)
      },
      {
        path: 'listsales',
        canLoad : [GuardVM3Guard],
        canActivate : [GuardVM3Guard],
        loadChildren: () => import('./listSale/list/list-sales.module').then(module => module.ListSalesModule)
      },
      {
        path: 'salesdetail',
        loadChildren: () => import('./listSale/details/sale-details.module').then(module => module.SaleDetailsModule)
      },
      {
        path: 'listdevis',
        canLoad : [GuardVM4Guard],
        canActivate : [GuardVM4Guard],
        loadChildren: () => import('./listDevis/list-devis.module').then(module => module.ListDevisModule)
      },
      {
        path: 'partialsale',
        canLoad : [GuardVM2Guard],
        canActivate : [GuardVM2Guard],
        loadChildren: () => import('./partial-sale-create/partial-sale-create.module').then(module => module.PartialSaleModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentesRoutingModule { }
