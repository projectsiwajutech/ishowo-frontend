import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./auth-signup/auth-signup.module').then(module => module.AuthSignupModule)
      },

      {
        path: 'signup',
        loadChildren: () => import('./auth-signup/auth-signup.module').then(module => module.AuthSignupModule)
      },
      {
        path: 'signup-v2',
        loadChildren: () => import('./auth-signup-v2/auth-signup-v2.module').then(module => module.AuthSignupV2Module)
      },
      {
        path: 'signin',
        loadChildren: () => import('./auth-signin/auth-signin.module').then(module => module.AuthSigninModule)
      },
      {
        path: 'connection',
        loadChildren: () => import('./signin/signin.module').then(module => module.SignInModule)
      },
      {
        path: 'new-licence',
        loadChildren: () => import('./signup/signup.module').then(module => module.SignUpModule)
      },
      {
        path: 'new',
       component :SignupComponent
      },
      {
        path: 'change-licence',
        loadChildren: () => import('./change-licence/change-licence.module').then(module => module.ChangeLicenceModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./auth-reset-password/auth-reset-password.module').then(module => module.AuthResetPasswordModule)
      },
      {
        path: 'reset-password-v2',
        loadChildren: () => import('./auth-reset-password-v2/auth-reset-password-v2.module')
          .then(module => module.AuthResetPasswordV2Module)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./auth-change-password/auth-change-password.module').then(module => module.AuthChangePasswordModule)
      },
      {
        path: 'change-password-v2',
        loadChildren: () => import('./auth-change-password-v2/auth-change-password-v2.module')
          .then(module => module.AuthChangePasswordV2Module)
      },
      {
        path: 'personal-information',
        loadChildren: () => import('./auth-personal-info/auth-personal-info.module').then(module => module.AuthPersonalInfoModule)
      },
      {
        path: 'profile-settings',
        loadChildren: () => import('./auth-profile-settings/auth-profile-settings.module').then(module => module.AuthProfileSettingsModule)
      },
      {
        path: 'verification/:slug',
        loadChildren: () => import('./auth-verified/auth-verified.module').then(module => module.AuthVerifiedModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
