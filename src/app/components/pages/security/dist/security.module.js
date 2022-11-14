"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SecurityModule = void 0;
var user_delete_component_1 = require("./users/delete/user-delete.component");
var user_create_component_1 = require("./users/create/user-create.component");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var profile_create_component_1 = require("./profiles/create/profile-create.component");
var profile_update_component_1 = require("./profiles/update/profile-update.component");
var profile_delete_component_1 = require("./profiles/delete/profile-delete.component");
var security_routing_module_1 = require("./security-routing.module");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var angular2_text_mask_1 = require("angular2-text-mask");
var changepassword_component_1 = require("./profiles/changepassword/changepassword.component");
var group_view_component_1 = require("./groups/view/group-view.component");
var group_create_component_1 = require("./groups/create/group-create.component");
var group_update_component_1 = require("./groups/update/group-update.component");
var user_update_component_1 = require("./users/update/user-update.component");
var SecurityModule = /** @class */ (function () {
    function SecurityModule() {
    }
    SecurityModule = __decorate([
        core_1.NgModule({
            declarations: [profile_create_component_1.ProfileCreateComponent, profile_update_component_1.ProfileUpdateComponent, profile_delete_component_1.ProfileDeleteComponent,
                user_update_component_1.UserUpdateComponent, user_delete_component_1.UserDeleteComponent, user_create_component_1.UserCreateComponent,
                group_create_component_1.GroupCreateComponent, group_update_component_1.GroupUpdateComponent, changepassword_component_1.ChangepasswordComponent, group_view_component_1.GroupViewComponent],
            imports: [
                common_1.CommonModule,
                security_routing_module_1.SecurityRoutingModule,
                shared_module_1.SharedModule,
                angular2_text_mask_1.TextMaskModule
            ]
        })
    ], SecurityModule);
    return SecurityModule;
}());
exports.SecurityModule = SecurityModule;
