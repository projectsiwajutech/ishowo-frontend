import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommProductRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';
import { NewProductButtonComponent } from 'src/app/components/utils/new-product-button/new-product-button.component';


@NgModule({
  declarations: [ProductsComponent, NewProductButtonComponent],
  imports: [
    CommonModule,
    EcommProductRoutingModule,
    SharedModule,
  ]
})
export class ParamsModule { }
