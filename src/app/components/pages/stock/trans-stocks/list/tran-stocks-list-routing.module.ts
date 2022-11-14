import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranStocksListComponent } from './tran-stocks-list.component';


const routes: Routes = [
  {
    path: '',
    component: TranStocksListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranStocksRoutingModule { }
