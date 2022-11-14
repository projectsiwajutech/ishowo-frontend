import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthVerifiedRoutingModule } from './auth-verified-routing.module';
import { AuthVerifiedComponent } from './auth-verified.component';

@NgModule({
  imports: [
    CommonModule,
    AuthVerifiedRoutingModule
  ],
  declarations: [AuthVerifiedComponent]
})
export class AuthVerifiedModule { }
