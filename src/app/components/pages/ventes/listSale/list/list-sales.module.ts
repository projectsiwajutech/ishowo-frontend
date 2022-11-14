import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListSalesComponent } from './list-sales.component';
import { ListSalesRoutingModule } from './list-sales-routing.module';


@NgModule({
  declarations: [ListSalesComponent],
  imports: [
    CommonModule,
    ListSalesRoutingModule,
    SharedModule,
  ],
  providers: []

})
export class ListSalesModule { }
