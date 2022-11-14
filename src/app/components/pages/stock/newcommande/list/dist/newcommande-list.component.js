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
exports.NewcommandeListComponent = void 0;
var core_1 = require("@angular/core");
var compartment_1 = require("src/app/shared/models/compartment/compartment");
var order_1 = require("src/app/shared/models/order/order");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var savedOrder_1 = require("src/app/shared/models/order/savedOrder");
var saved_orders_list_component_1 = require("./saved-orders-list/saved-orders-list.component");
var NewcommandeListComponent = /** @class */ (function () {
    function NewcommandeListComponent(supplierService, modalService, compartmentService, orderService, locStorService, router, libraryService, ngxService) {
        this.supplierService = supplierService;
        this.modalService = modalService;
        this.compartmentService = compartmentService;
        this.orderService = orderService;
        this.locStorService = locStorService;
        this.router = router;
        this.libraryService = libraryService;
        this.ngxService = ngxService;
        this.OrderListProducts = [];
        this.sum = 0;
        //list
        this.compartments = [];
        this.suppliers = [];
        this.categories = [];
        this.products = [];
        this.measureTypes = [];
        this.productsTypes = [];
        this.filteredProducts = [];
        this.code_barre = "";
        //form related objects
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    NewcommandeListComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.item = new order_1.Order();
        this.saveItem = new savedOrder_1.SavedOrder();
        this.receiveOrderListProducts();
        this.getCompartments();
        this.getSuppliers();
    };
    NewcommandeListComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.item = new order_1.Order();
        this.productsBycat = this.products;
    }; //end ngOnChanges
    //create object
    NewcommandeListComponent.prototype.save = function (form) {
        var _this = this;
        //action
        this.ngxService.start();
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.orderService.createOrder(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = new order_1.Order();
            _this.statusMessage = "Commande crée avec succès";
            _this.created.emit("created");
            window.setTimeout(function () { _this.isCompleted = false; }, 1000);
            localStorage.removeItem('addedProducts');
            var newRouterLink = _this.router.url;
            _this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                _this.router.navigate([newRouterLink]);
            });
            _this.ngxService.stop();
            sweetalert2_js_1["default"].fire({
                customClass: { container: 'myCustomSwal' },
                icon: 'success',
                title: 'Enregistrement Réussi !',
                text: 'Votre commande a été enregistrée avec succès.'
            });
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
            var newRouterLink = _this.router.url;
            _this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                _this.router.navigate([newRouterLink]);
            });
            _this.ngxService.stop();
            sweetalert2_js_1["default"].fire({
                customClass: { container: 'myCustomSwal' },
                icon: 'error',
                title: 'Echec de l\'enregistrement !',
                text: 'Une erreur est survenue. Veuillez réessayer'
            });
        });
    };
    //save commande for later
    NewcommandeListComponent.prototype.saveforLater = function (libelle) {
        var _this = this;
        //action
        this.ngxService.start();
        this.saveItem.id = 0;
        this.saveItem.agent = this.user;
        this.saveItem.destination = new compartment_1.Compartment();
        this.saveItem.date = new Date();
        this.saveItem.amount = 0;
        this.saveItem.amount_paid = 0;
        this.saveItem.product_lines = this.OrderListProducts;
        this.saveItem.is_balanced = false;
        this.saveItem.title = libelle;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.orderService.saveOrder(this.saveItem)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = new order_1.Order();
            window.setTimeout(function () { _this.isCompleted = false; }, 1000);
            var newRouterLink = _this.router.url;
            _this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                _this.router.navigate([newRouterLink]);
            });
            _this.ngxService.stop();
            sweetalert2_js_1["default"].fire({
                customClass: { container: 'myCustomSwal' },
                icon: 'success',
                title: 'Sauvegarde Enregistrée !',
                text: 'Votre sauvegarde a été enregistrée avec succès.'
            });
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
            var newRouterLink = _this.router.url;
            _this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                _this.router.navigate([newRouterLink]);
            });
            _this.ngxService.stop();
            sweetalert2_js_1["default"].fire({
                customClass: { container: 'myCustomSwal' },
                icon: 'error',
                title: 'Echec de l\'enregistrement !',
                text: 'Une erreur est survenue. Veuillez réessayer'
            });
        });
    };
    NewcommandeListComponent.prototype.receiveOrderListProducts = function () {
        var products = this.locStorService.readFromSession('addedProducts');
        this.OrderListProducts = products;
        if ((this.OrderListProducts !== undefined) && (this.OrderListProducts !== null)) {
            if (this.OrderListProducts.length === 0) {
                this.dataIsAvailable = false;
            }
            else {
                this.dataIsAvailable = true;
            }
        }
    };
    //get list of compartments
    NewcommandeListComponent.prototype.getCompartments = function () {
        var _this = this;
        this.compartments = [];
        this.compartmentService.getCompartments(this.user)
            .then(function (compartments) {
            _this.compartments = compartments;
        }, function (error) {
        });
    }; //fin getCompartments
    //get list of suppliers
    NewcommandeListComponent.prototype.getSuppliers = function () {
        var _this = this;
        this.suppliers = [];
        this.supplierService.getSuppliers(this.user)
            .then(function (suppliers) {
            _this.suppliers = suppliers;
        }, function (error) {
        });
    }; //fin getSuppliers
    //modal d'ajout
    NewcommandeListComponent.prototype.createModal = function () {
        this.router.navigate(['/stocks/listcreate']);
    }; // end createModal
    NewcommandeListComponent.prototype.saveModal = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var amount_paid, formData, get_amount_paid, myitem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((form.supplier.id === undefined) || (form.destination.id === undefined))) return [3 /*break*/, 1];
                        sweetalert2_js_1["default"].fire({
                            customClass: { container: 'myCustomSwal' },
                            title: 'Champs non Renseignés',
                            text: 'Veuillez sélectionnez un fournisseur et un rayon',
                            icon: 'warning'
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, sweetalert2_js_1["default"].fire({
                            customClass: { container: 'myCustomSwal' },
                            html: '<b>Confirmez-vous ce montant ?</b>',
                            imageUrl: 'assets/images/auth/ishowo.png',
                            input: 'number',
                            inputValue: form.amount_paid,
                            showCancelButton: true,
                            cancelButtonText: "Annuler",
                            reverseButtons: true,
                            confirmButtonText: "Valider la Commande",
                            backdrop: "\n      rgba(0,0,123,0.4)\n      left top\n      no-repeat\n    "
                        })];
                    case 2:
                        amount_paid = (_a.sent()).value;
                        formData = {
                            supplier: form.supplier,
                            destination: form.destination
                        };
                        get_amount_paid = amount_paid.replaceAll('"', '');
                        get_amount_paid = JSON.parse(amount_paid);
                        myitem = {
                            id: 0,
                            agent: this.user,
                            destination: form.destination,
                            date: new Date(),
                            amount: this.getTotal(),
                            amount_paid: get_amount_paid,
                            supplier: form.supplier,
                            product_lines: this.OrderListProducts,
                            is_balanced: false
                        };
                        this.item = myitem;
                        this.save(formData);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //remove product in Lines
    NewcommandeListComponent.prototype.RemoveProduct = function (id) {
        this.OrderListProducts.splice(id, 1);
        this.locStorService.saveToSession('addedProducts', this.OrderListProducts);
    }; //fin removeproduct in Lines
    // get Total
    NewcommandeListComponent.prototype.getTotal = function () {
        var sum = this.OrderListProducts.reduce(function (acc, cur) { return acc + cur.quantity * cur.purchase_price; }, 0);
        this.sum = sum;
        return this.sum;
    }; // get Total
    NewcommandeListComponent.prototype.confirmProdRemoveModal = function (itemIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sweetalert2_js_1["default"].fire({
                            customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-danger' },
                            text: 'Êtes-vous sûre de retirer ce Produit',
                            imageUrl: 'assets/images/params/delete.png',
                            imageHeight: 100,
                            imageWidth: 100,
                            showCancelButton: true,
                            cancelButtonText: "<i class=\"fas fa-window-close\"></i> Annuler",
                            confirmButtonText: "<i class=\"fas fa-trash-alt\"></i> Oui je Retire",
                            reverseButtons: true,
                            buttonsStyling: true
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                _this.RemoveProduct(itemIndex);
                                _this.libraryService.onSuccess('Produit retiré', 1200, 'top-end');
                                var newRouterLink_1 = _this.router.url;
                                _this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                                    _this.router.navigate([newRouterLink_1]);
                                });
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //modal d'enregistrement de sauvegarde
    NewcommandeListComponent.prototype.saveForLaterModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var libelle;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sweetalert2_js_1["default"].fire({
                            customClass: { container: 'myCustomSwal' },
                            html: '<b>NOM DE SAUVEGARDE</b>',
                            input: 'text',
                            inputPlaceholder: "Veuilez nommer votre sauvegarde",
                            showCancelButton: true,
                            cancelButtonText: "<i class=\"fas fa-window-close\"></i> Annuler",
                            reverseButtons: true,
                            confirmButtonText: "<i class=\"fas fa-save\"></i> Enregistrer",
                            inputValidator: function (value) {
                                if (value.length < 1) {
                                    return 'Nom Invalide!';
                                }
                            }
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                _this.saveforLater(result.value);
                            }
                        })];
                    case 1:
                        libelle = (_a.sent()).value;
                        return [2 /*return*/];
                }
            });
        });
    };
    //fin modal d'enregistrement de sauvegarde
    //modal de chargement de sauvegarde
    NewcommandeListComponent.prototype.launchSavedOrderModal = function () {
        this.modalService.open(saved_orders_list_component_1.SavedOrdersListComponent, { windowClass: 'myCustomSwal', size: 'xl' });
    };
    __decorate([
        core_1.Output()
    ], NewcommandeListComponent.prototype, "created");
    NewcommandeListComponent = __decorate([
        core_1.Component({
            selector: 'app-newcommande-list',
            templateUrl: './newcommande-list.component.html',
            styleUrls: ['./newcommande-list.component.scss']
        })
    ], NewcommandeListComponent);
    return NewcommandeListComponent;
}());
exports.NewcommandeListComponent = NewcommandeListComponent;
