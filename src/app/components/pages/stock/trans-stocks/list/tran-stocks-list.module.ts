import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TranStocksRoutingModule } from './tran-stocks-list-routing.module';
import { TranStocksListComponent } from './tran-stocks-list.component';

@NgModule({
  declarations: [TranStocksListComponent],
  imports: [
    CommonModule,
    TranStocksRoutingModule,
    SharedModule,
  ]
})
export class TranStocksModule { }
