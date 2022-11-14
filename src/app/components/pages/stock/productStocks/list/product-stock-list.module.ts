import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ProductStockListComponent } from './product-stock-list.component';
import { ProductsInStockRoutingModule } from './product-stock-list-routing.module';

@NgModule({
  declarations: [ProductStockListComponent],
  imports: [
    CommonModule,
    ProductsInStockRoutingModule,
    SharedModule,
  ]
})
export class ProductsInStockModule { }
