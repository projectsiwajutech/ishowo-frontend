import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../../../theme/shared/shared.module';
import { CustomersComponent } from './customers.component';
import {EcommProductRoutingModule } from './customers-routing.module';


@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    EcommProductRoutingModule,
    SharedModule,
  ]
})
export class ParamsModule { }
