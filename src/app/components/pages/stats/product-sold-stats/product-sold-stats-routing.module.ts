import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSoldStatsComponent } from './product-sold-stats.component';


const routes: Routes = [
  {
    path: '',
    component: ProductSoldStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSoldStatsRoutingModule { }
