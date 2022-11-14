import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HdCustomerRoutingModule } from './hd-customer-routing.module';
import { HdCustomerComponent } from './hd-customer.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {TinymceModule} from 'angular2-tinymce';

@NgModule({
  declarations: [HdCustomerComponent],
  imports: [
    CommonModule,
    HdCustomerRoutingModule,
    SharedModule,
    TinymceModule
  ]
})
export class HdCustomerModule { }
