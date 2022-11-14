import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommProductRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    EcommProductRoutingModule,
    SharedModule,
  ]
})
export class ParamsModule { }
