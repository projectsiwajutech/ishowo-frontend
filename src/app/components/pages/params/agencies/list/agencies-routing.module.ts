import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgenciesComponent} from './agencies.component';


const routes: Routes = [
  {
    path: '',
    component: AgenciesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommProductRoutingModule { }
