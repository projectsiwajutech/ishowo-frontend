import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductGlobalStatsComponent } from './product-global-stats.component';


const routes: Routes = [
  {
    path: '',
    component: ProductGlobalStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductGlobalStatsRoutingModule { }
