import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanksRoutingModule } from './banks-routing.module';
import { BanksComponent } from './banks.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';


@NgModule({
  declarations: [BanksComponent],
  imports: [
    CommonModule,
    BanksRoutingModule,
    SharedModule,
  ]
})
export class BanksModule { }
