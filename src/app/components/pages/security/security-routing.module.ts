import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardSQ1Guard } from '../guards/SQ1/guard-sq1.guard';
import { GuardSQ2Guard } from '../guards/SQ2/guard-sq2.guard';
import { GuardSQ3Guard } from '../guards/SQ3/guard-sq3.guard';
import { GuardSQ4Guard } from '../guards/SQ4/guard-sq4.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        // canLoad : [GuardSQ2Guard],
        // canActivate : [GuardSQ2Guard],
        loadChildren: () => import('./users/list/users.module').then(module => module.UsersModule)
      },
      {
        path: 'profiles',
        // canLoad : [GuardSQ3Guard],
        // canActivate : [GuardSQ3Guard],
        loadChildren: () => import('./profiles/list/profiles.module').then(module => module.ProfilesModule)
      },
      {
        path: 'current',
        // canLoad : [GuardSQ4Guard],
        // canActivate : [GuardSQ4Guard],
        loadChildren: () => import('./licence/current/current.module').then(module => module.CurrentModule)
      },
      {
        path: 'groups',
        // canLoad : [GuardSQ1Guard],
        // canActivate : [GuardSQ1Guard],
        loadChildren: () => import('./groups/list/groups.module').then(module => module.GroupsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
