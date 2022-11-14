import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSalesComponent } from './list-sales.component';


const routes: Routes = [
  {
    path: '',
    component: ListSalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSalesRoutingModule { }
