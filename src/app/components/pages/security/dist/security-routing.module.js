"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SecurityRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var guard_sq1_guard_1 = require("../guards/SQ1/guard-sq1.guard");
var guard_sq2_guard_1 = require("../guards/SQ2/guard-sq2.guard");
var guard_sq3_guard_1 = require("../guards/SQ3/guard-sq3.guard");
var guard_sq4_guard_1 = require("../guards/SQ4/guard-sq4.guard");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'users',
                canLoad: [guard_sq2_guard_1.GuardSQ2Guard],
                canActivate: [guard_sq2_guard_1.GuardSQ2Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./users/list/users.module'); }).then(function (module) { return module.UsersModule; }); }
            },
            {
                path: 'profiles',
                canLoad: [guard_sq3_guard_1.GuardSQ3Guard],
                canActivate: [guard_sq3_guard_1.GuardSQ3Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./profiles/list/profiles.module'); }).then(function (module) { return module.ProfilesModule; }); }
            },
            {
                path: 'current',
                canLoad: [guard_sq4_guard_1.GuardSQ4Guard],
                canActivate: [guard_sq4_guard_1.GuardSQ4Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./licence/current/current.module'); }).then(function (module) { return module.CurrentModule; }); }
            },
            {
                path: 'groups',
                canLoad: [guard_sq1_guard_1.GuardSQ1Guard],
                canActivate: [guard_sq1_guard_1.GuardSQ1Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./groups/list/groups.module'); }).then(function (module) { return module.GroupsModule; }); }
            }
        ]
    }
];
var SecurityRoutingModule = /** @class */ (function () {
    function SecurityRoutingModule() {
    }
    SecurityRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], SecurityRoutingModule);
    return SecurityRoutingModule;
}());
exports.SecurityRoutingModule = SecurityRoutingModule;
