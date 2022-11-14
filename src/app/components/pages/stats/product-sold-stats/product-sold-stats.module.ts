import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { ProductSoldStatsComponent } from './product-sold-stats.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ProductSoldStatsRoutingModule } from './product-sold-stats-routing.module';


@NgModule({
  declarations: [ProductSoldStatsComponent],
  imports: [
    CommonModule,
    ProductSoldStatsRoutingModule,
    SharedModule,
    DataTablesModule
  ]
})
export class ProductSoldStatsModule { }
