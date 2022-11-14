import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../../../theme/shared/shared.module';
import { ParamMecefRoutingModule } from './param-mecef-routing.module';
import { ParamMecefComponent } from './param-mecef.component';


@NgModule({
  declarations: [ParamMecefComponent],
  imports: [
    CommonModule,
    ParamMecefRoutingModule,
    SharedModule,
  ]
})
export class ParamMecefModule { }
