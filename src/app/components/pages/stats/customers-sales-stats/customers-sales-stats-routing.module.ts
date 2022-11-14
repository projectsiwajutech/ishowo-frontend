import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersSalesStatsComponent } from './customers-sales-stats.component';


const routes: Routes = [
  {
    path: '',
    component: CustomersSalesStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersSalesStatsRoutingModule { }
