import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardSMGuard } from '../guards/SM/guard-sm.guard';
import { GuardSM1Guard } from '../guards/SM1/guard-sm1.guard';
import { GuardSM2Guard } from '../guards/SM2/guard-sm2.guard';
import { GuardSM3Guard } from '../guards/SM3/guard-sm3.guard';
import { GuardSM4Guard } from '../guards/SM4/guard-sm4.guard';
import { GuardSM5Guard } from '../guards/SM5/guard-sm5.guard';
import { GuardSM6Guard } from '../guards/SM6/guard-sm6.guard';
import { GuardSM7Guard } from '../guards/SM7/guard-sm7.guard';
import { GuardSM8Guard } from '../guards/SM8/guard-sm8.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'main',
        canLoad : [GuardSMGuard],
        canActivate : [GuardSMGuard],
        loadChildren: () => import('./main/main.module').then(module => module.MainModule)
      },
      {
        path: 'listnew',
        canLoad : [GuardSM1Guard],
        canActivate : [GuardSM1Guard],
        loadChildren: () => import('./newcommande/list/newcommande-list.module').then(module => module.NewCommandeListModule)
      },
      {
        path: 'listcreate',
        loadChildren: () => import('./newcommande/create/commande-create.module').then(module => module.CommandeCreateModule)
      },
      {
        path: 'orderslist',
        canLoad : [GuardSM2Guard],
        canActivate : [GuardSM2Guard],
        loadChildren: () => import('./searchcommande/list/commande-list.module').then(module => module.CommandesListModule)
      },
      {
        path: 'ordersdetail',
        loadChildren: () => import('./searchcommande/details/commande-details.module').then(module => module.CommandeDetailsModule)
      },
      {
        path: 'stockProducts',
        canLoad : [GuardSM3Guard],
        canActivate : [GuardSM3Guard],
        loadChildren: () => import('./productStocks/list/product-stock-list.module').then(module => module.ProductsInStockModule)
      },
      {
        path: 'barresCodes',
        canLoad : [GuardSM4Guard],
        canActivate : [GuardSM4Guard],
        loadChildren: () => import('./gen-barcodes/generate-barcode.module').then(module => module.GenerateBareCodeModule)
      },
      {
        path: 'printbarresCodes',
        canLoad : [GuardSM5Guard],
        canActivate : [GuardSM5Guard],
        loadChildren: () => import('./print-barcodes/print-barcode.module').then(module => module.PrintBareCodeModule)
      },
      {
        path: 'seuilStocks',
        canLoad : [GuardSM7Guard],
        canActivate : [GuardSM7Guard],
        loadChildren: () => import('./seuilStocks/list/seuil-stock-list.module').then(module => module.SeuilStockModule)
      },
      {
        path: 'hsProducts',
        canLoad : [GuardSM8Guard],
        canActivate : [GuardSM8Guard],
        loadChildren: () => import('./horsSeuilProducts/list/hs-products-list.module').then(module => module.HsProductsModule)
      },
      {
        path: 'transStocks',
        canLoad : [GuardSM6Guard],
        canActivate : [GuardSM6Guard],
        loadChildren: () => import('./trans-stocks/list/tran-stocks-list.module').then(module => module.TranStocksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
