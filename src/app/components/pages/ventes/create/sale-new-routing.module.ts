import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleNewComponent } from './sale-new.component';


const routes: Routes = [
  {
    path: '',
    component: SaleNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleNewRoutingModule { }
