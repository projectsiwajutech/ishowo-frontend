import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';


@NgModule({
  declarations: [OperationsComponent],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    SharedModule,
  ]
})
export class OperationsModule { }
