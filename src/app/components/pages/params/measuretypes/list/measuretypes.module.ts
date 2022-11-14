import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommProductRoutingModule } from './measuretypes-routing.module';
import { MeasuretypesComponent } from './measuretypes.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [MeasuretypesComponent],
  imports: [
    CommonModule,
    EcommProductRoutingModule,
    SharedModule,
  ]
})
export class ParamsModule { }
