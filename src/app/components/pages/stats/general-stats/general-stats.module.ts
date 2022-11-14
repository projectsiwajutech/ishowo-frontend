import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { GeneralStatsComponent } from './general-stats.component';
import { GeneralStatsRoutingModule } from './general-stats-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [GeneralStatsComponent],
  imports: [
    CommonModule,
    GeneralStatsRoutingModule,
    SharedModule,
    DataTablesModule
  ]
})
export class GeneralStatsModule { }
