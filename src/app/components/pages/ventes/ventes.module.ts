import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { VentesRoutingModule } from './ventes-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VentesRoutingModule,
    SharedModule,
  ]
})
export class VentesModule { }


