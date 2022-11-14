"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ParamMecefComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var updateMecef_1 = require("src/app/shared/models/updateMecef/updateMecef");
var ParamMecefComponent = /** @class */ (function () {
    function ParamMecefComponent(mecefService, locStorService, router, libraryService, ngxService) {
        this.mecefService = mecefService;
        this.locStorService = locStorService;
        this.router = router;
        this.libraryService = libraryService;
        this.ngxService = ngxService;
    }
    ParamMecefComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getParamsMecef();
    };
    //Incrementation du port COM
    ParamMecefComponent.prototype.IncrementNumber = function () {
        this.portMecef++;
        this.CheckNumber();
        return;
    };
    //Décrémentation du port COM
    ParamMecefComponent.prototype.DecrementNumber = function () {
        this.portMecef = this.portMecef - 1;
        this.CheckNumber();
        return;
    }; //fin Décrémentations
    //CHANGE GROUP LEFT
    ParamMecefComponent.prototype.ChangeTaxGroupLeft = function () {
        this.Changed = true;
        switch (this.setGroup) {
            case "A":
                this.setGroup = "B";
                break;
            case "E":
                this.setGroup = "A";
                break;
            case "B":
                this.setGroup = "E";
                break;
            default:
                break;
        }
    };
    //Change group right
    ParamMecefComponent.prototype.ChangeTaxGroupRight = function () {
        this.Changed = true;
        switch (this.setGroup) {
            case "A":
                this.setGroup = "E";
                break;
            case "E":
                this.setGroup = "B";
                break;
            case "B":
                this.setGroup = "A";
                break;
            default:
                break;
        }
    };
    //End change group right
    //ShowGroupText
    ParamMecefComponent.prototype.ShowGroupText = function () {
        switch (this.setGroup) {
            case "A":
                return "Produits Exonérés de la TVA (TVA: 0%)";
                break;
            case "E":
                return "Produits sous Régime TPS (TVA: 0%)";
                break;
            case "B":
                return "Produits Taxables (TVA: 18%)";
                break;
            default:
                break;
        }
    };
    //end ShowGroupText
    //Change AIB left
    ParamMecefComponent.prototype.ChangeAIBLeft = function () {
        this.Changed = true;
        switch (this.setAIB) {
            case "0%":
                this.setAIB = "5%";
                break;
            case "1%":
                this.setAIB = "0%";
                break;
            case "5%":
                this.setAIB = "1%";
                break;
            default:
                break;
        }
    };
    //End Change AIB Left
    //Change AIB right
    ParamMecefComponent.prototype.ChangeAIBRight = function () {
        this.Changed = true;
        switch (this.setAIB) {
            case "0%":
                this.setAIB = "1%";
                break;
            case "1%":
                this.setAIB = "5%";
                break;
            case "5%":
                this.setAIB = "0%";
                break;
            default:
                break;
        }
    };
    //End change AIB right
    //ShowGroupText
    ParamMecefComponent.prototype.ShowAIBText = function () {
        switch (this.setAIB) {
            case "0%":
                return "Aucun Taux AIB ne sera appliqué";
                break;
            case "1%":
                return "Taux AIB: 1%";
                break;
            case "5%":
                return "Taux AIB: 5%";
                break;
            default:
                break;
        }
    };
    //end ShowGroupText
    //Check de la quantité
    ParamMecefComponent.prototype.CheckNumber = function () {
        //check qty
        this.Changed = true;
        if (this.portMecef == 0 || this.portMecef == null) {
            this.portMecef = 1;
            this.libraryService.onWarning('Numéro de Port invalide !', 1000, 'top-end');
            return;
        }
    }; //fin Check de la quantité
    //get paramsMecef
    ParamMecefComponent.prototype.getParamsMecef = function () {
        var _this = this;
        this.mecefService.getParamsMecef(this.user)
            .then(function (paramsMecef) {
            var port = paramsMecef.filter(function (param) { return param.key === "PORT"; })[0];
            var setMecef = paramsMecef.filter(function (param) { return param.key === "MECEF"; })[0];
            var setGroup = paramsMecef.filter(function (param) { return param.key === "DEF_TAX"; })[0];
            var setAIB = paramsMecef.filter(function (param) { return param.key === "AIB"; })[0];
            var setEMecef = paramsMecef.filter(function (param) { return param.key === "EMECEF"; })[0];
            _this.portMecef = JSON.parse(port.value);
            _this.setMecef = JSON.parse(setMecef.value);
            _this.setGroup = setGroup.value;
            _this.setAIB = setAIB.value;
            _this.setEMecef = JSON.parse(setEMecef.value);
        }, function (error) {
        });
    }; //fin paramsMecef
    //OnchangeMecef Status
    ParamMecefComponent.prototype.OnchangeStatut = function () {
        this.Changed = true;
        if (this.setMecef == false) {
            this.setMecef = true;
            this.setEMecef = false;
            this.libraryService.onSuccess('Normalisation Mecef Activée!', 1000, 'top-end');
        }
        else if (this.setMecef == true) {
            this.setMecef = false;
            this.libraryService.onSuccess('Normalisation Mecef Désactivée!', 1000, 'top-end');
        }
    }; // fin OnchangeMecef Status
    //OnchangeEMecef Status
    ParamMecefComponent.prototype.OnchangeStatutEmecef = function () {
        this.Changed = true;
        if (this.setEMecef == false) {
            this.setEMecef = true;
            this.setMecef = false;
            this.libraryService.onSuccess('Normalisation e-MeCEF Activée!', 1000, 'top-end');
        }
        else if (this.setEMecef == true) {
            this.setEMecef = false;
            this.libraryService.onSuccess('Normalisation e-MeCEF Désactivée!', 1000, 'top-end');
        }
    }; // fin OnchangeEMecef Status
    ParamMecefComponent.prototype.save = function () {
        var _this = this;
        this.ngxService.start();
        var ChangeParam = new updateMecef_1.UpdateMecef();
        ChangeParam.key_port = JSON.stringify(this.portMecef);
        ChangeParam.key_mecef = JSON.stringify(this.setMecef);
        ChangeParam.key_g_tax = this.setGroup;
        ChangeParam.key_emecef = JSON.stringify(this.setEMecef);
        ChangeParam.key_aib = this.setAIB;
        this.mecefService.updateMecefParams(ChangeParam)
            .then(function (result) {
            _this.ngxService.stop();
            _this.successSwal();
        }, function (error) {
            _this.ngxService.stop();
            _this.errorSwal();
        });
    };
    //Enregistrement réussie
    ParamMecefComponent.prototype.successSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire({
            customClass: { container: 'myCustomSwal' },
            title: 'Enregistrement réussi!',
            showConfirmButton: false,
            icon: "success",
            timer: 1100,
            timerProgressBar: true
        });
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Echec de l'enregistrement
    ParamMecefComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    ParamMecefComponent = __decorate([
        core_1.Component({
            selector: 'app-param-mecef',
            templateUrl: './param-mecef.component.html',
            styleUrls: ['./param-mecef.component.scss']
        })
    ], ParamMecefComponent);
    return ParamMecefComponent;
}());
exports.ParamMecefComponent = ParamMecefComponent;
