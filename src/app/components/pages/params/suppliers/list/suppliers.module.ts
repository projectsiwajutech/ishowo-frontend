import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommProductRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    EcommProductRoutingModule,
    SharedModule,
  ]
})
export class ParamsModule { }
