import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SaletargetsComponent} from './saletargets.component';


const routes: Routes = [
  {
    path: '',
    component: SaletargetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommProductRoutingModule { }
