import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';


@NgModule({
  declarations: [ProfilesComponent],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    SharedModule,
  ]
})
export class ProfilesModule { }
