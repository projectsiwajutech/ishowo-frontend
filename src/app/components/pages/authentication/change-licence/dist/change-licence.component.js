"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ChangeLicenceComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var licence_1 = require("src/app/shared/models/licence/licence");
var licence_request_1 = require("src/app/shared/models/licence/licence.request");
var common_1 = require("@angular/common");
var format_money_pipe_1 = require("src/app/shared/pipes/format_money/format_money.pipe");
var ChangeLicenceComponent = /** @class */ (function () {
    function ChangeLicenceComponent(profilService, libraryService, ngxService, locStorService, route, router) {
        this.profilService = profilService;
        this.libraryService = libraryService;
        this.ngxService = ngxService;
        this.locStorService = locStorService;
        this.route = route;
        this.router = router;
        this.isLoading = false;
        this.isLicenceOk = false;
        this.request = new licence_request_1.LicenceRequest();
        this.iLicence = new licence_1.Licence();
        this.isUserOk = false;
        this.codeCustomer = "";
        this.isCheckingProfile = false;
    }
    ChangeLicenceComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.readFromSession('licence_user');
        this.getModulesList();
        this.getFPrint();
    };
    ChangeLicenceComponent.prototype.ngOnDestroy = function () {
        this.ngxService.stop;
    };
    //go to Signin
    ChangeLicenceComponent.prototype.goBack = function () {
        var link = ['/auth/connection'];
        this.router.navigate(link);
    };
    //go to Signin
    //get fprint
    ChangeLicenceComponent.prototype.getFPrint = function () {
        var _this = this;
        this.profilService.getFPrint()
            .then(function (result) {
            _this.fprint = result.name;
            _this.request.fprint = _this.fprint;
        }, function (error) {
            sweetalert2_js_1["default"].fire({
                customClass: { container: 'myCustomSwal' },
                icon: 'error',
                title: 'Une erreur est survenue lors du test de votre configuration'
            });
        });
    }; //fin getFPrint
    //get current licence code
    ChangeLicenceComponent.prototype.getCurrentLicence = function () {
        var _this = this;
        this.profilService.getLastLicenceForUpdate()
            .then(function (result) {
            _this.request.code = result.name;
        }, function (error) {
            sweetalert2_js_1["default"].fire({
                customClass: { container: 'myCustomSwal' },
                icon: 'error',
                title: 'Une erreur est survenue lors de la vérification de votre licence'
            });
        });
    }; //fin getCurrentLicence
    //get modules list
    ChangeLicenceComponent.prototype.getModulesList = function () {
        var _this = this;
        this.profilService.getModulesFu()
            .then(function (result) {
            _this.modulesList = result.data;
        }, function (error) {
            sweetalert2_js_1["default"].fire({
                customClass: { container: 'myCustomSwal' },
                icon: 'error',
                title: 'Une erreur est survenue lors du chargement des modules'
            });
        });
    }; //fin getModulesList
    //ask for licence
    ChangeLicenceComponent.prototype.askForLicence = function (module) {
        var _this = this;
        this.ngxService.start();
        this.isLoading = true;
        this.request.id_company = this.user.agency.company.id;
        this.request.nom_company = this.user.agency.company.name;
        this.request.adresse_company = this.user.agency.company.address;
        this.request.telephone_company = this.user.agency.company.phone;
        this.request.secteur = this.user.agency.company.description;
        this.request.nom_admin = this.user.user.lastname;
        this.request.prenom_admin = this.user.user.firstname;
        this.request.telephone_admin = this.user.user.phone;
        this.request.module = module;
        this.request.code = this.user.agency.company.currentLicence.code;
        this.profilService.askForLicenceUpdate(this.request)
            .then(function (result) {
            if (result.status === "success") {
                //fill the rest of data
                _this.iLicence.company = _this.user.agency.company;
                _this.iLicence.isActive = true;
                _this.iLicence.code = result.code_client;
                _this.iLicence.key = result.alea;
                _this.iLicence.activationDate = result.date_activation.date;
                _this.iLicence.expiryDate = result.date_expiration.date;
                _this.iLicence.activationCost = _this.request.module.montant;
                _this.iLicence.module = _this.request.module.nom;
                _this.saveLicence(_this.iLicence);
                return;
            }
            else {
                _this.isLoading = false;
                _this.ngxService.stop();
                sweetalert2_js_1["default"].fire({
                    customClass: { container: 'myCustomSwal' },
                    icon: 'error',
                    title: result.message
                });
            }
        }, function (error) {
            _this.isLoading = false;
            _this.ngxService.stop();
            if (error.status === 401) {
                sweetalert2_js_1["default"].fire({
                    customClass: { container: 'myCustomSwal' },
                    icon: 'error',
                    title: error._body
                });
            }
            else {
                sweetalert2_js_1["default"].fire({
                    customClass: { container: 'myCustomSwal' },
                    icon: 'error',
                    title: 'Une erreur est survenue lors de la connexion'
                });
            }
        });
    }; //fin askForLicence
    //savelicence
    ChangeLicenceComponent.prototype.saveLicence = function (obj) {
        var _this = this;
        this.profilService.updateLicenceChange(obj)
            .then(function (result) {
            _this.iLicence.key = "";
            _this.isLoading = false;
            _this.ngxService.stop();
            if (result === null) {
                sweetalert2_js_1["default"].fire({
                    customClass: { container: 'myCustomSwal' },
                    icon: 'error',
                    title: 'Une erreur est survenue'
                });
            }
            else {
                _this.ngxService.stop();
                _this.isLicenceOk = true;
                _this.iLicence = result;
                _this.request = new licence_request_1.LicenceRequest();
                localStorage.removeItem('licence_user');
                _this.SuccessOperationModal(_this.iLicence);
                _this.goBack();
            }
        }, function (error) {
            _this.isLoading = false;
            if (error.status === 401) {
                sweetalert2_js_1["default"].fire({
                    customClass: { container: 'myCustomSwal' },
                    icon: 'error',
                    title: error._body
                });
                _this.goBack();
            }
            else {
                sweetalert2_js_1["default"].fire({
                    customClass: { container: 'myCustomSwal' },
                    icon: 'error',
                    title: 'Une erreur est survenue.'
                });
            }
        });
    }; //fin saveLicence
    //login now
    ChangeLicenceComponent.prototype.loginNow = function () {
        var link = ['/login'];
        this.router.navigate(link);
    }; //fin loginNow
    //get licence status
    ChangeLicenceComponent.prototype.getLicenceStatus = function (status) {
        if (status === true)
            return "ACTIVEE";
        else
            return "INACTIVE";
    }; //fin getLicenceStatus
    //is code customer right
    ChangeLicenceComponent.prototype.isCodeCustomerRight = function () {
        if (this.codeCustomer === undefined || this.codeCustomer === "")
            return false;
        if (this.codeCustomer.length < 5)
            return false;
        return true;
    }; //fin isCodeCustomerRight
    //modal de mise à jour réussie
    ChangeLicenceComponent.prototype.SuccessOperationModal = function (licence) {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, endDate;
            return __generator(this, function (_a) {
                startDate = new common_1.DatePipe('en-US').transform(licence.activationDate, 'dd/MM/yyyy');
                endDate = new common_1.DatePipe('en-US').transform(licence.expiryDate, 'dd/MM/yyyy');
                sweetalert2_js_1["default"].fire({
                    title: 'Mis à jour réussie!',
                    icon: 'success',
                    html: '<br><div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Code Client : </p> <p class="badge col-sm-3 badge-success">' + licence.code + '</p></div>' +
                        '<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Votre licence est : </p><p class="badge col-sm-3 badge-success">' + this.getLicenceStatus(licence.isActive) + '</p></div>' +
                        '<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Commence le : </p><p class="badge col-sm-3 badge-success">' + startDate + '</p></div>' +
                        '<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Expire le : </p><p class="badge col-sm-3 badge-success">' + endDate + '</p></div>'
                });
                return [2 /*return*/];
            });
        });
    }; //fin message de succès
    //modal d'avertissement du processus de payement
    ChangeLicenceComponent.prototype.LaunchPayModal = function (module) {
        return __awaiter(this, void 0, void 0, function () {
            var formatAmount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formatAmount = new format_money_pipe_1.FormatMoneyPipe().transform(module.montant, '');
                        return [4 /*yield*/, sweetalert2_js_1["default"].fire({
                                customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-primary', cancelButton: 'btn btn-light', denyButton: 'btn btn-warning' },
                                icon: 'info',
                                title: 'DEMARRAGE DU PROCESSUS DE PAIEMENT',
                                html: '<br><p class="text-center h4"> Un processus de paiement d\'un montant de <span class="badge badge-success mt-1">' + formatAmount +
                                    ' FCFA </span> sera lancé sur le numéro de téléphone suivant : <span class="badge badge-success mt-1">' + this.user.user.phone + '</span> </p>' +
                                    '<p class="text-center font-weight-bold h3 text-warning">Voulez-vous modifier ce numéro ?</p>',
                                showDenyButton: true,
                                showCancelButton: true,
                                showCloseButton: true,
                                confirmButtonText: "<i class=\"feather icon-check-circle\"></i> Continuer",
                                denyButtonText: "<i class=\"feather icon-edit-1\"></i> Oui, Modifier",
                                denyButtonColor: '#ff9800',
                                cancelButtonText: "<i class=\"feather icon-x-circle\"></i> Annuler",
                                reverseButtons: true,
                                buttonsStyling: true
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    _this.askForLicence(module);
                                }
                                else if (result.isDenied) {
                                    _this.changePayNumber(module);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //fin modal d'avertissement du processus de payement
    //change Transaction phone number
    ChangeLicenceComponent.prototype.changePayNumber = function (module) {
        return __awaiter(this, void 0, void 0, function () {
            var format, formatScreen;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        format = this.user.user.phone.substring(5);
                        formatScreen = format.replaceAll('-', '');
                        return [4 /*yield*/, sweetalert2_js_1["default"].fire({
                                customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-primary' },
                                title: 'MODIFICATION DU NUMERO DE PAIEMENT',
                                imageUrl: 'assets/images/params/payPhoneNumb.png',
                                imageHeight: 122,
                                imageWidth: 200,
                                showCancelButton: true,
                                input: 'text',
                                inputValue: formatScreen,
                                inputLabel: 'Numéro de paiement',
                                inputPlaceholder: 'Veuillez saisir le numéro de paiement',
                                inputValidator: function (value) {
                                    var result = /^(?:9[01456789]|6[0123456789]|5[01234])[0-9]{6}$/.test(value);
                                    if (!value || !result) {
                                        return 'Numéro de téléphone Invalide!';
                                    }
                                },
                                inputAttributes: {
                                    maxlength: 8,
                                    autocapitalize: 'off',
                                    autocorrect: 'off'
                                },
                                cancelButtonText: "<i class=\"feather icon-x-circle\"></i> Annuler",
                                confirmButtonText: "<i class=\"feather icon-check-circle\"></i> Confirmer",
                                reverseButtons: true,
                                buttonsStyling: true
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    var format_1 = result.value.match(/\d{2}/g).join('-');
                                    _this.user.user.phone = '+229' + ' ' + format_1;
                                    _this.LaunchPayModal(module);
                                }
                                else {
                                    _this.LaunchPayModal(module);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChangeLicenceComponent = __decorate([
        core_1.Component({
            selector: 'app-change-licence',
            templateUrl: './change-licence.component.html',
            styleUrls: ['./change-licence.component.scss']
        })
    ], ChangeLicenceComponent);
    return ChangeLicenceComponent;
}());
exports.ChangeLicenceComponent = ChangeLicenceComponent;
