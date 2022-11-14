import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccountsRoutingModule } from './vaccounts-routing.module';
import { VaccountsComponent } from './vaccounts.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';


@NgModule({
  declarations: [VaccountsComponent],
  imports: [
    CommonModule,
    VaccountsRoutingModule,
    SharedModule,
  ]
})
export class VaccountsModule { }
