import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompartmentsComponent} from './compartments.component';


const routes: Routes = [
  {
    path: '',
    component: CompartmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommProductRoutingModule { }
