import { UserDeleteComponent } from './users/delete/user-delete.component';
import { UserCreateComponent } from './users/create/user-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileCreateComponent } from './profiles/create/profile-create.component';
import { ProfileUpdateComponent } from './profiles/update/profile-update.component';
import { ProfileDeleteComponent } from './profiles/delete/profile-delete.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ChangepasswordComponent } from './profiles/changepassword/changepassword.component';
import { GroupViewComponent } from './groups/view/group-view.component';
import { GroupCreateComponent } from './groups/create/group-create.component';
import { GroupUpdateComponent } from './groups/update/group-update.component';
import { UserUpdateComponent } from './users/update/user-update.component';

@NgModule({
  declarations: [ProfileCreateComponent, ProfileUpdateComponent, ProfileDeleteComponent,
    UserUpdateComponent, UserDeleteComponent, UserCreateComponent,
    GroupCreateComponent, GroupUpdateComponent,ChangepasswordComponent, GroupViewComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SharedModule,
    TextMaskModule
  ]
})
export class SecurityModule { }
