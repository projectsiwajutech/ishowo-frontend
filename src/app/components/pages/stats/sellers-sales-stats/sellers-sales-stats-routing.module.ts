import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellersSalesStatsComponent } from './sellers-sales-stats.component';


const routes: Routes = [
  {
    path: '',
    component: SellersSalesStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellersSalesStatsRoutingModule { }
