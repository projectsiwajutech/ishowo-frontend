import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductStockListComponent } from './product-stock-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductStockListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsInStockRoutingModule { }
