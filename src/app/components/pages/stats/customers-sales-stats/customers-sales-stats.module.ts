import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { CustomersSalesStatsRoutingModule } from './customers-sales-stats-routing.module';
import { CustomersSalesStatsComponent } from './customers-sales-stats.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [CustomersSalesStatsComponent],
  imports: [
    CommonModule,
    CustomersSalesStatsRoutingModule,
    SharedModule,
    DataTablesModule
  ]
})
export class CustomersSalesStatsModule { }
