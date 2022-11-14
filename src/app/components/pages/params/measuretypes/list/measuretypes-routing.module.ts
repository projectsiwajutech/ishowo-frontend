import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MeasuretypesComponent} from './measuretypes.component';


const routes: Routes = [
  {
    path: '',
    component: MeasuretypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommProductRoutingModule { }
