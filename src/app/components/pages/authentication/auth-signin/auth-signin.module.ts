import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CustomFormsModule } from 'ngx-custom-validators';

@NgModule({
  imports: [
    CommonModule,
    AuthSigninRoutingModule,
    SharedModule,
    CustomFormsModule,
  ],
  declarations: [AuthSigninComponent]
})
export class AuthSigninModule { }
