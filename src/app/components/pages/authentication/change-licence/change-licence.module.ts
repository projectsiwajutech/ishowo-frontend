import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { TextMaskModule } from 'angular2-text-mask';
import { NgbCollapseModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeLicenceComponent } from './change-licence.component';
import { ChangeLicenceRoutingModule } from './change-licence-routing.module';

@NgModule({
  declarations: [ChangeLicenceComponent],
  imports: [
    CommonModule,
    ChangeLicenceRoutingModule,
    SharedModule,
    ArchwizardModule,
    TextMaskModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbTooltipModule
  ]
})
export class ChangeLicenceModule { }
