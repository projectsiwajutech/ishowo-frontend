import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignInRoutingModule } from './signin-routing.module';
import { BasicCardsRoutingModule } from 'src/app/demo/ui-elements/ui-basic/basic-cards/basic-cards-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SigninComponent } from './signin.component';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule,
    BasicCardsRoutingModule,
    SharedModule
  ]
})
export class SignInModule { }
