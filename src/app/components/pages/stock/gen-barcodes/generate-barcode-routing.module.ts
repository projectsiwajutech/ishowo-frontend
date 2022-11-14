import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateBarcodeComponent } from './generate-barcode.component';


const routes: Routes = [
  {
    path: '',
    component: GenerateBarcodeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateBareCodeRoutingModule { }
