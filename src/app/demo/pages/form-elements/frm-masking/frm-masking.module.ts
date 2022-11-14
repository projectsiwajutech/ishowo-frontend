import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrmMaskingRoutingModule } from './frm-masking-routing.module';
import { FrmMaskingComponent } from './frm-masking.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {TextMaskModule} from 'angular2-text-mask';
import {NgNumberFormatterModule} from 'ng-number-formatter';
/*import {NgxCurrencyModule} from 'ngx-currency';*/

@NgModule({
  imports: [
    CommonModule,
    FrmMaskingRoutingModule,
    SharedModule,
    TextMaskModule,
    /*NgxCurrencyModule,*/
    NgNumberFormatterModule
  ],
  declarations: [FrmMaskingComponent]
})
export class FrmMaskingModule { }
