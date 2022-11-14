import { SharedModule } from './../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupModalComponent } from '../../modals/signup-modal/signup-modal.component';
import { AuthVerifiedComponent } from './auth-verified/auth-verified.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    SharedModule

  ],
  declarations: [
    SignupModalComponent
  ]
})
export class AuthenticationModule { }
