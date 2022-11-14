import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartialSaleCreateComponent } from './partial-sale-create.component';


const routes: Routes = [
  {
    path: '',
    component: PartialSaleCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartialSaleRoutingModule { }
