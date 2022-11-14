import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VaccountsComponent} from './vaccounts.component';


const routes: Routes = [
  {
    path: '',
    component: VaccountsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccountsRoutingModule { }
