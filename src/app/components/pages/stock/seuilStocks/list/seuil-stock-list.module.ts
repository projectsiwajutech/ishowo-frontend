import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SeuilStockListComponent } from './seuil-stock-list.component';
import { SeuilStockRoutingModule } from './seuil-stock-list-routing.module';

@NgModule({
  declarations: [SeuilStockListComponent],
  imports: [
    CommonModule,
    SeuilStockRoutingModule,
    SharedModule,
  ]
})
export class SeuilStockModule { }
