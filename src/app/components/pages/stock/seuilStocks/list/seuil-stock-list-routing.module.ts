import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeuilStockListComponent } from './seuil-stock-list.component';


const routes: Routes = [
  {
    path: '',
    component: SeuilStockListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeuilStockRoutingModule { }
