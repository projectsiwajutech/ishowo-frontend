import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthVerifiedComponent} from './auth-verified.component';

const routes: Routes = [
  {
    path: '',
    component: AuthVerifiedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthVerifiedRoutingModule { }
