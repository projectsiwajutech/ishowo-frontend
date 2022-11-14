import { OperationCreateComponent } from './operations/create/operation-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FinancesRoutingModule } from './finances-routing.module';
import { BankCreateComponent } from './banks/create/bank-create.component';
import { BankDeleteComponent } from './banks/delete/bank-delete.component';
import { BankUpdateComponent } from './banks/update/bank-update.component';
import { VaccountCreateComponent } from './virtualaccounts/create/vaccount-create.component';
import { VaccountDeleteComponent } from './virtualaccounts/delete/vaccount-delete.component';
import { VaccountUpdateComponent } from './virtualaccounts/update/vaccount-update.component';

@NgModule({
  declarations: [
    BankCreateComponent, BankDeleteComponent, BankUpdateComponent, VaccountCreateComponent,
    VaccountDeleteComponent, VaccountUpdateComponent, OperationCreateComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class FinancesModule { }
