import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintBarcodeComponent } from './print-barcode.component';


const routes: Routes = [
  {
    path: '',
    component: PrintBarcodeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintBareCodeRoutingModule { }
