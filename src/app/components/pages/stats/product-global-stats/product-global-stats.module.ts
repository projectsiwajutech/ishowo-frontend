import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { ProductGlobalStatsComponent } from './product-global-stats.component';
import { ProductGlobalStatsRoutingModule } from './product-global-stats-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ProductGlobalStatsComponent],
  imports: [
    CommonModule,
    ProductGlobalStatsRoutingModule,
    SharedModule,
    DataTablesModule
  ]
})
export class ProductGlobalStatsModule { }
