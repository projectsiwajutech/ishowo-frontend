import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSalesComponent } from './main-sales.component';


const routes: Routes = [
  {
    path: '',
    component: MainSalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainSalesRoutingModule { }
