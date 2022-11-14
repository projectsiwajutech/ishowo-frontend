import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { GenerateBarcodeComponent } from './generate-barcode.component';
import { GenerateBareCodeRoutingModule } from './generate-barcode-routing.module';

@NgModule({
  declarations: [GenerateBarcodeComponent],
  imports: [
    CommonModule,
    GenerateBareCodeRoutingModule,
    SharedModule,
  ]
})
export class GenerateBareCodeModule { }
