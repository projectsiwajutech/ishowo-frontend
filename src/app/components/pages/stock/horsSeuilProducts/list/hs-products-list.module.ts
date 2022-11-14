import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HsProductsListComponent } from './hs-products-list.component';
import { HsProductsRoutingModule } from './hs-products-list-routing.module';

@NgModule({
  declarations: [HsProductsListComponent],
  imports: [
    CommonModule,
    HsProductsRoutingModule,
    SharedModule,
  ]
})
export class HsProductsModule { }
