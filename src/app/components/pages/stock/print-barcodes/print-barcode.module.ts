import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PrintBareCodeRoutingModule } from './print-barcode-routing.module';
import { PrintBarcodeComponent } from './print-barcode.component';

@NgModule({
  declarations: [PrintBarcodeComponent],
  imports: [
    CommonModule,
    PrintBareCodeRoutingModule,
    SharedModule,
  ]
})
export class PrintBareCodeModule { }
