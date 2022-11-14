import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommProductRoutingModule } from './saletargets-routing.module';
import { SaletargetsComponent } from './saletargets.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [SaletargetsComponent],
  imports: [
    CommonModule,
    EcommProductRoutingModule,
    SharedModule,
  ]
})
export class ParamsModule { }
