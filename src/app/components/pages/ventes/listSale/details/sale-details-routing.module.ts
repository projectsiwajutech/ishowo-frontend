import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleDetailsComponent } from './sale-details.component';


const routes: Routes = [
  {
    path: '',
    component: SaleDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleDetailsRoutingModule { }
