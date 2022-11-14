import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleDetailsComponent } from './sale-details.component';
import { SaleDetailsRoutingModule } from './sale-details-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [SaleDetailsComponent],
  imports: [
    CommonModule,
    SaleDetailsRoutingModule,
    SharedModule,
  ]
})
export class SaleDetailsModule { }
