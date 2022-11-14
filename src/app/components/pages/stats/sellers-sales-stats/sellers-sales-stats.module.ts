import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { SellersSalesStatsComponent } from './sellers-sales-stats.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SellersSalesStatsRoutingModule } from './sellers-sales-stats-routing.module';


@NgModule({
  declarations: [SellersSalesStatsComponent],
  imports: [
    CommonModule,
    SellersSalesStatsRoutingModule,
    SharedModule,
    DataTablesModule
  ]
})
export class SellersSalesStatsModule { }
