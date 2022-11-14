import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandeListComponent } from './commande-list.component';


const routes: Routes = [
  {
    path: '',
    component: CommandeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesListRoutingModule { }
