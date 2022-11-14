import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HsProductsListComponent } from './hs-products-list.component';


const routes: Routes = [
  {
    path: '',
    component: HsProductsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HsProductsRoutingModule { }
