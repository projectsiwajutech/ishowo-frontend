"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthenticationRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-signup/auth-signup.module'); }).then(function (module) { return module.AuthSignupModule; }); }
            },
            {
                path: 'signup',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-signup/auth-signup.module'); }).then(function (module) { return module.AuthSignupModule; }); }
            },
            {
                path: 'signup-v2',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-signup-v2/auth-signup-v2.module'); }).then(function (module) { return module.AuthSignupV2Module; }); }
            },
            {
                path: 'signin',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-signin/auth-signin.module'); }).then(function (module) { return module.AuthSigninModule; }); }
            },
            {
                path: 'connection',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./signin/signin.module'); }).then(function (module) { return module.SignInModule; }); }
            },
            {
                path: 'new-licence',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./signup/signup.module'); }).then(function (module) { return module.SignUpModule; }); }
            },
            {
                path: 'change-licence',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./change-licence/change-licence.module'); }).then(function (module) { return module.ChangeLicenceModule; }); }
            },
            {
                path: 'reset-password',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-reset-password/auth-reset-password.module'); }).then(function (module) { return module.AuthResetPasswordModule; }); }
            },
            {
                path: 'reset-password-v2',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-reset-password-v2/auth-reset-password-v2.module'); }).then(function (module) { return module.AuthResetPasswordV2Module; }); }
            },
            {
                path: 'change-password',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-change-password/auth-change-password.module'); }).then(function (module) { return module.AuthChangePasswordModule; }); }
            },
            {
                path: 'change-password-v2',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-change-password-v2/auth-change-password-v2.module'); }).then(function (module) { return module.AuthChangePasswordV2Module; }); }
            },
            {
                path: 'personal-information',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-personal-info/auth-personal-info.module'); }).then(function (module) { return module.AuthPersonalInfoModule; }); }
            },
            {
                path: 'profile-settings',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./auth-profile-settings/auth-profile-settings.module'); }).then(function (module) { return module.AuthProfileSettingsModule; }); }
            }
        ]
    }
];
var AuthenticationRoutingModule = /** @class */ (function () {
    function AuthenticationRoutingModule() {
    }
    AuthenticationRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AuthenticationRoutingModule);
    return AuthenticationRoutingModule;
}());
exports.AuthenticationRoutingModule = AuthenticationRoutingModule;
