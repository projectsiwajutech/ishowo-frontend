import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MainSalesComponent } from './main-sales.component';
import { MainSalesRoutingModule } from './main-sales-routing.module';


@NgModule({
  declarations: [MainSalesComponent],
  imports: [
    CommonModule,
    MainSalesRoutingModule,
    SharedModule,
  ]
})
export class MainSalesModule { }
