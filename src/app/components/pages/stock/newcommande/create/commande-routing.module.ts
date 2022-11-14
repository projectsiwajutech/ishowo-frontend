import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommandeCreateComponent} from './commande-create.component';


const routes: Routes = [
  {
    path: '',
    component: CommandeCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeCreateRoutingModule { }
