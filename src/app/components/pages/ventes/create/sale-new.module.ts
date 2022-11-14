import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SaleNewComponent } from './sale-new.component';
import { SaleNewRoutingModule } from './sale-new-routing.module';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';


@NgModule({
  declarations: [SaleNewComponent, NewCustomerComponent],
  imports: [
    CommonModule,
    SaleNewRoutingModule,
    SharedModule,
    SnotifyModule
  ],
  providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService]

})
export class SaleNewModule { }
