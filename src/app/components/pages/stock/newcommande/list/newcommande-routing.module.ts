import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewcommandeListComponent} from './newcommande-list.component';


const routes: Routes = [
  {
    path: '',
    component: NewcommandeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCommandeRoutingModule { }
