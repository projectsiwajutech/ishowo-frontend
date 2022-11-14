import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SignupComponent } from './signup.component';
import { SignUpRoutingModule } from './signup-routing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    SharedModule,
    ArchwizardModule,
    TextMaskModule
  ]
})
export class SignUpModule { }
