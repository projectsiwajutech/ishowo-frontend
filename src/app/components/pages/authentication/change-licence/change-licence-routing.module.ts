import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeLicenceComponent } from './change-licence.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeLicenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeLicenceRoutingModule { }
