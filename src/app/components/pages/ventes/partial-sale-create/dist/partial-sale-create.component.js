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
exports.PartialSaleCreateComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var category_1 = require("src/app/shared/models/category/category");
var customer_1 = require("src/app/shared/models/customer/customer");
var ProductParam_1 = require("src/app/shared/models/query/ProductParam");
var sale_1 = require("src/app/shared/models/sale/sale");
var product_sale_add_pipe_1 = require("src/app/shared/pipes/domain_specific/product_sale_add.pipe");
var FileSaver = require("file-saver");
var new_customer_component_1 = require("../create/new-customer/new-customer.component");
var productLine_1 = require("src/app/shared/models/product/productLine");
var PartialSaleCreateComponent = /** @class */ (function () {
    function PartialSaleCreateComponent(saleService, categoryService, productService, libraryService, locStorService, customerService, route, router, modalService, constantService, ngxService, sanitizer) {
        this.saleService = saleService;
        this.categoryService = categoryService;
        this.productService = productService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.customerService = customerService;
        this.route = route;
        this.router = router;
        this.modalService = modalService;
        this.constantService = constantService;
        this.ngxService = ngxService;
        this.sanitizer = sanitizer;
        this.pdfTitle = "Facture";
        this.lineSize = 0;
        this.Defremise = 0;
        this.typeRemise = "pourcentage";
        this.typeRemise1 = "pourcentage";
        this.typeRemise2 = "montant";
        this.Deftva = 0;
        this.prodSaleAdd = new product_sale_add_pipe_1.ProductSaleAddPipe();
        this.stock_view = [];
        this.quantity = 0;
        this.selling_price = 0;
        this.reliquat = 0;
        this.restToPaid = 0;
        //form related objects
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.isInvoiceVisible = false;
        this.generatedInvoice = "";
        this.isLoadingStock = false;
        this.display = false;
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
        //devis
        this.is_checked = false;
        //filter variables
        this.param = new ProductParam_1.ProductParam();
    }
    //ngOnInit
    PartialSaleCreateComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param = new ProductParam_1.ProductParam();
        this.getStockView();
        this.getCategories();
        this.getParamsMecef();
        this.item = new sale_1.Sale();
    }; //end ngOnInit
    //ngOnChanges
    PartialSaleCreateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.param = new ProductParam_1.ProductParam();
        this.getStockView();
        this.item = new sale_1.Sale();
    }; //end ngOnChanges
    PartialSaleCreateComponent.prototype.ngAfterViewInit = function () {
        this.onLoadFocus();
    };
    //focus
    PartialSaleCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("code_barre").focus();
    };
    //fin focus
    //test de limitation
    PartialSaleCreateComponent.prototype.inputValidator = function (event) {
        var pattern = /[0-9]/;
        var montant_reçu = JSON.stringify(this.numPadAmount);
        if ((!pattern.test(event.target.value)) || (montant_reçu.length > 7)) {
            this.ResetNumPad();
        }
    };
    //fin test de limitation
    //add product line
    PartialSaleCreateComponent.prototype.addProductLine = function (obj) {
        //check if undefined
        if (this.item.lines === undefined || this.item.lines === null) {
            this.item.lines = [];
        }
        //add 1 automatically for ease of use
        if (obj.quantity_sell === 0) {
            obj.quantity_sell = 1;
        }
        //check if already added
        var searchProdList = this.item.lines.filter(function (x) { return x.id === obj.id; });
        if (searchProdList.length !== 0) {
            var searchProdIndex = this.item.lines.indexOf(searchProdList[0]);
            //check qty
            if (this.item.lines[searchProdIndex].quantite >= obj.quantity) {
                this.libraryService.onWarning('Quantité en stock atteinte!', 1000, 'top-end');
                return;
            }
            this.item.lines[searchProdIndex].quantite = this.item.lines[searchProdIndex].quantite + obj.quantity_sell;
            this.updateTax(this.item.lines[searchProdIndex].id, this.item.lines[searchProdIndex].tax);
            this.lineSize = this.item.lines.length;
        }
        else {
            var newLine = new productLine_1.ProductLine();
            newLine.id = obj.id;
            newLine.product = obj.product;
            newLine.compartment = obj.compartment;
            newLine.p_achat = obj.purchase_price;
            newLine.p_vente = obj.selling_price;
            newLine.quantite = obj.quantity_sell;
            newLine.ts = 0;
            newLine.libellets = "";
            newLine.tax = this.setGroup,
                newLine.prod = obj;
            var copiedPStock = this.libraryService.copy(newLine);
            this.item.lines.push(copiedPStock);
            this.updateTax(copiedPStock.id, copiedPStock.tax);
            this.lineSize = this.item.lines.length;
        }
    }; //fin addProductLine
    //remove product line
    PartialSaleCreateComponent.prototype.removeProductLine = function (index) {
        this.item.lines.splice(index, 1);
        this.lineSize = this.item.lines.length;
    }; //fin removeProductLine
    //get Net à Payer
    PartialSaleCreateComponent.prototype.getNap = function (form) {
        if (this.item === undefined || this.item === null) {
            return 0;
        }
        if (this.item.lines === undefined || this.item.lines === null) {
            return 0;
        }
        if (this.item.lines.length === 0) {
            return 0;
        }
        var total = 0;
        total = this.item.lines
            .map(function (p) { return (p.quantite * p.p_vente) + p.mt_tva; })
            .reduce(function (sum, current) { return sum + current; });
        if (form.type_remise === "montant") {
            var remise = form.remise;
            this.LineRemise = (remise * 100) / this.getTotal();
            this.LineTVA = form.tva;
            this.REMISE = (this.getTotal() * this.LineRemise) / 100;
            var Mt_Remise = total - (total * this.LineRemise) / 100;
            // let Mt_Tva = (Mt_Remise * this.LineTVA) / 100;
            // this.TVA = Mt_Tva;
            // this.NAP = Mt_Remise + Mt_Tva;
            this.NAP = Mt_Remise;
        }
        else if (form.type_remise === "pourcentage") {
            this.LineRemise = form.remise;
            this.LineTVA = form.tva;
            this.REMISE = (this.getTotal() * this.LineRemise) / 100;
            var Mt_Remise = total - (total * this.LineRemise) / 100;
            // let Mt_Tva = (Mt_Remise * this.LineTVA) / 100;
            // this.TVA = Mt_Tva;
            // this.NAP = Mt_Remise + Mt_Tva;
            this.NAP = Mt_Remise;
        }
        var aib;
        switch (this.setAIB) {
            case "0%":
                this.item.taux_aib = 0;
                this.item.amount_aib = 0;
                return this.NAP;
            case "1%":
                aib = (this.getTotal() * 1) / 100;
                this.item.taux_aib = 1;
                this.item.amount_aib = aib;
                this.NAP = this.NAP + aib;
                return this.NAP;
                break;
            case "5%":
                aib = (this.getTotal() * 5) / 100;
                this.item.taux_aib = 5;
                this.item.amount_aib = aib;
                this.NAP = this.NAP + aib;
                return this.NAP;
                break;
            default:
                break;
        }
    }; //fin get Net à Payer
    // get Reliquat
    PartialSaleCreateComponent.prototype.getReliquat = function () {
        var total = this.NAP;
        var calc = this.numPadAmount - total;
        if (calc > 0) {
            this.reliquat = calc;
        }
        else {
            this.reliquat = 0;
        }
        return this.reliquat;
    }; //fin get Reliquat
    //get Total TVA
    PartialSaleCreateComponent.prototype.getTVA = function () {
        if (this.item === undefined || this.item === null) {
            return 0;
        }
        if (this.item.lines === undefined || this.item.lines === null) {
            return 0;
        }
        if (this.item.lines.length === 0) {
            return 0;
        }
        var totalTVA = 0;
        totalTVA = this.item.lines
            .map(function (p) { return p.mt_tva; })
            .reduce(function (sum, current) { return sum + current; });
        return totalTVA;
    };
    //fin get Total TVA
    // get RestToPaid
    PartialSaleCreateComponent.prototype.getRestToPaid = function () {
        var total = this.NAP;
        var calc = this.numPadAmount - total;
        if (calc < 0) {
            this.restToPaid = -(calc);
        }
        else {
            this.restToPaid = 0;
        }
        return this.restToPaid;
    }; //fin get RestToPaid
    //get total
    PartialSaleCreateComponent.prototype.getTotal = function () {
        if (this.item === undefined || this.item === null) {
            return 0;
        }
        if (this.item.lines === undefined || this.item.lines === null) {
            return 0;
        }
        if (this.item.lines.length === 0) {
            return 0;
        }
        var total = 0;
        total = this.item.lines
            .map(function (p) { return p.quantite * p.p_vente; })
            .reduce(function (sum, current) { return sum + current; });
        return total;
    }; //fin getTotal
    //create object
    PartialSaleCreateComponent.prototype.saveSale = function () {
        var _this = this;
        //conditions reunies ou non
        if ((this.item.lines === null || this.item.lines === undefined || this.item.lines.length === 0)) {
            this.libraryService.onWarning('Veuillez ajouter un Produit!', 1100, 'top-end');
            return;
        }
        else if (this.numPadAmount === undefined) {
            this.libraryService.onWarning('veuillez renseignez le Montant reçu!', 1100, 'top-end');
            return;
        }
        else if (this.locStorService.readFromSession('Customer') === null) {
            this.libraryService.onWarning('veuillez renseignez le Client!', 1100, 'top-end');
            return;
        }
        else if (this.getRestToPaid() == 0) {
            this.libraryService.onWarning('Le montant saisi n\'est pas conforme à la vente à crédit!', 1300, 'top-end');
            return;
        }
        this.ngxService.start();
        this.pdfTitle = "Facture";
        //Sale
        this.item.id = 0;
        this.item.date = new Date();
        this.item.is_balanced = false;
        this.item.amount_original = this.getTotal();
        ;
        this.item.amount_remise = this.REMISE;
        this.item.amount_tva = this.getTVA();
        this.item.amount_paid = JSON.parse(this.numPadAmount);
        this.item.amount_to_pay = this.NAP;
        this.item.remainder = this.getReliquat();
        this.item.rest_to_pay = this.getRestToPaid();
        this.item.agent = this.user;
        this.item.with_invoice = null;
        this.item.reference = "";
        //update product amount_tva
        this.item.lines.forEach(function (element) {
            _this.updateTax(element.id, element.tax);
        });
        //customer
        if (this.locStorService.readFromSession('Customer') === null) {
            this.item.customer = new customer_1.Customer();
        }
        else {
            this.item.customer = this.locStorService.readFromSession('Customer');
            this.customer.solde = this.customer.solde + this.getRestToPaid();
            this.customerService.updateCustomer(this.customer);
        }
        //statut indicators
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.generatedInvoice = "";
        this.isInvoiceVisible = false;
        this.saleService.createSale(this.item)
            .then(function (result) {
            _this.giveUpSale();
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.getStockView();
            _this.ngxService.stop();
            var fileBlob = result.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_TICKET_CAISSE.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            _this.libraryService.onSuccess('Vente Enregistrée avec Succès!', 2500, 'top-end');
            window.open(url, '_blank');
            _this.locStorService.saveToSession("lastSale", url);
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.ngxService.stop();
            _this.libraryService.onSuccess('Vente Enregistrée avec Succès!', 2000, 'top-end');
            _this.libraryService.onError('Echec de la normalisation!', 3000, 'top-start');
            return;
        });
    }; //end saveSale
    //create object
    PartialSaleCreateComponent.prototype.saveDevis = function () {
        var _this = this;
        //conditions reunies ou non
        if ((this.item.lines === null || this.item.lines === undefined || this.item.lines.length === 0)) {
            this.libraryService.onWarning('Veuillez ajouter un Produit!', 1100, 'top-end');
            return;
        }
        else if (this.locStorService.readFromSession('Customer') === null) {
            this.libraryService.onWarning('veuillez renseignez le Client!', 1100, 'top-end');
            return;
        }
        this.ngxService.start();
        this.pdfTitle = "Devis";
        //checks
        if (this.item.lines === undefined || this.item.lines === null) {
            this.item.lines = [];
        }
        if (this.item.lines.length === 0) {
            this.libraryService.showMessage("Veuillez aujouter des produits à cette commande");
            return;
        }
        //Devis
        this.item.id = 0;
        this.item.date = new Date();
        this.item.is_balanced = false;
        this.item.amount_original = this.getTotal();
        this.item.amount_remise = this.REMISE;
        this.item.amount_tva = this.getTVA();
        this.item.amount_paid = 0;
        this.item.amount_to_pay = this.NAP;
        this.item.remainder = this.getReliquat();
        this.item.rest_to_pay = this.getRestToPaid();
        this.item.agent = this.user;
        this.item.customer = this.locStorService.readFromSession('Customer');
        this.item.with_invoice = null;
        this.item.reference = "";
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.generatedInvoice = "";
        this.isInvoiceVisible = false;
        //update product amount_tva
        this.item.lines.forEach(function (element) {
            _this.updateTax(element.id, element.tax);
        });
        this.saleService.createDevis(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.ngxService.stop();
            _this.item = new sale_1.Sale();
            _this.lineSize = 0;
            _this.deleteCustomer();
            _this.Defremise = 0;
            _this.Deftva = 0;
            _this.statusMessage = "Devis créé avec succès";
            _this.created.emit("created");
            _this.getStockView();
            var fileBlob = result.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_DEVIS.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            _this.libraryService.onSuccess('Devis Enregistrée avec Succès!', 2500, 'top-end');
            window.open(url, '_blank');
            _this.locStorService.saveToSession("lastSale", url);
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.ngxService.stop();
            _this.statusMessage = _this.libraryService.getServiceErrorText(error);
        });
    }; //end saveDevis
    //get list of products stock view
    PartialSaleCreateComponent.prototype.getStockView = function () {
        var _this = this;
        this.stock_view = [];
        this.isLoadingStock = true;
        this.productService.getStockViewForSale(this.user)
            .then(function (stock_view) {
            _this.stock_view = stock_view;
            _this.isLoadingStock = false;
        }, function (error) { _this.isLoadingStock = false; });
    }; //fin getStockView
    //get list of categories
    PartialSaleCreateComponent.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.categoryService.getCategories(this.user)
            .then(function (categories) {
            var emptyObj = new category_1.Category();
            emptyObj.id = 0;
            emptyObj.name = "Toutes";
            _this.categories.push(emptyObj);
            if (categories !== null) {
                categories.filter(function (obj) { return _this.categories.push(obj); });
            }
        }, function (error) {
        });
    }; //fin getCategories
    //liste les ventes
    PartialSaleCreateComponent.prototype.listSale = function () {
        var link = ['/app/sales_list'];
        this.router.navigate(link);
    }; //fin listSale
    //add breakOrNot
    PartialSaleCreateComponent.prototype.addBreakOrNot = function (itemName) {
        if (itemName.length < 14 || itemName.length < 14) {
            return true;
        }
        else {
            return false;
        }
    }; //fin add breakOrNot
    //change Product Tax
    PartialSaleCreateComponent.prototype.changeTax = function (id, tax) {
        var searchProdList = this.item.lines.filter(function (x) { return x.id === id; });
        var searchProdIndex = this.item.lines.indexOf(searchProdList[0]);
        var Original_Price = this.item.lines[searchProdIndex].p_vente * this.item.lines[searchProdIndex].quantite;
        this.item.amount_remise = this.REMISE;
        switch (tax) {
            case undefined:
                this.item.lines[searchProdIndex].tax = "E";
                if (this.item.amount_remise > 0) {
                    this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
                }
                else {
                    this.item.lines[searchProdIndex].mt_remise = 0;
                }
                this.item.lines[searchProdIndex].mt_tva = 0;
                break;
            case "E":
                this.item.lines[searchProdIndex].tax = "B";
                var HT = void 0;
                if (this.item.amount_remise > 0) {
                    this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
                }
                else {
                    this.item.lines[searchProdIndex].mt_remise = 0;
                }
                HT = (Original_Price - this.item.lines[searchProdIndex].mt_remise);
                this.item.lines[searchProdIndex].mt_tva = (HT * 18) / 100;
                break;
            case "B":
                this.item.lines[searchProdIndex].tax = "A";
                if (this.item.amount_remise > 0) {
                    this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
                }
                else {
                    this.item.lines[searchProdIndex].mt_remise = 0;
                }
                this.item.lines[searchProdIndex].mt_tva = 0;
                break;
            default:
                this.item.lines[searchProdIndex].tax = "E";
                if (this.item.amount_remise > 0) {
                    this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
                }
                else {
                    this.item.lines[searchProdIndex].mt_remise = 0;
                }
                this.item.lines[searchProdIndex].mt_tva = 0;
                break;
        }
    };
    //end change Product Tax
    PartialSaleCreateComponent.prototype.updateAllProducts = function () {
        var _this = this;
        this.item.lines.forEach(function (element) {
            _this.updateTax(element.id, element.tax);
        });
    };
    //update Product Tax
    PartialSaleCreateComponent.prototype.updateTax = function (id, tax) {
        var searchProdList = this.item.lines.filter(function (x) { return x.id === id; });
        var searchProdIndex = this.item.lines.indexOf(searchProdList[0]);
        var Original_Price = this.item.lines[searchProdIndex].p_vente * this.item.lines[searchProdIndex].quantite;
        this.item.amount_remise = this.REMISE;
        switch (tax) {
            case "A":
                if (this.item.amount_remise > 0) {
                    this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
                }
                else {
                    this.item.lines[searchProdIndex].mt_remise = 0;
                }
                this.item.lines[searchProdIndex].mt_tva = 0;
                break;
            case "B":
                var HT = void 0;
                if (this.item.amount_remise > 0) {
                    this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
                }
                else {
                    this.item.lines[searchProdIndex].mt_remise = 0;
                }
                HT = (Original_Price - this.item.lines[searchProdIndex].mt_remise);
                this.item.lines[searchProdIndex].mt_tva = (HT * 18) / 100;
                break;
            case "E":
                if (this.item.amount_remise > 0) {
                    this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
                }
                else {
                    this.item.lines[searchProdIndex].mt_remise = 0;
                }
                this.item.lines[searchProdIndex].mt_tva = 0;
                break;
            default:
                break;
        }
    };
    //end update Product Tax
    //Incrementation de la quantité
    PartialSaleCreateComponent.prototype.IncrementQuantity = function (obj) {
        //check if undefined
        if (this.item.lines === undefined || this.item.lines === null) {
            this.item.lines = [];
        }
        //add 1 automatically for ease of use
        if (obj.quantity_sell === 0) {
            obj.quantity_sell = 1;
        }
        //check if already added
        var searchProdList = this.item.lines.filter(function (x) { return x.id === obj.id; });
        if (searchProdList.length !== 0) {
            var searchProdIndex = this.item.lines.indexOf(searchProdList[0]);
            //check qty
            if (this.item.lines[searchProdIndex].quantite >= obj.quantity) {
                this.libraryService.onWarning('Quantité en stock atteinte!', 1000, 'top-end');
                return;
            }
            this.item.lines[searchProdIndex].quantite = this.item.lines[searchProdIndex].quantite + obj.quantity_sell;
            this.updateTax(this.item.lines[searchProdIndex].id, this.item.lines[searchProdIndex].tax);
            this.lineSize = this.item.lines.length;
        }
    }; //Incrémentation de la quantité
    //Décrémentation de la quantité
    PartialSaleCreateComponent.prototype.DecrementQuantity = function (obj, quantity) {
        //check if already added
        if (quantity == 1) {
            this.libraryService.onWarning('La quantité minimum est 1', 1000, 'top-end');
            return;
        }
        var searchProdList = this.item.lines.filter(function (x) { return x.id === obj.id; })[0];
        var searchProdIndex = this.item.lines.indexOf(searchProdList);
        //check qty
        this.item.lines[searchProdIndex].quantite = this.item.lines[searchProdIndex].quantite - 1;
        this.updateTax(this.item.lines[searchProdIndex].id, this.item.lines[searchProdIndex].tax);
    }; //fin Décrémentation de la quantité
    //Check de la quantité
    PartialSaleCreateComponent.prototype.CheckQuantity = function (obj, quantity) {
        //check if already added
        var searchProdList = this.item.lines.filter(function (x) { return x.id == obj.id; })[0];
        var searchProdIndex = this.item.lines.indexOf(searchProdList);
        //check qty
        if (quantity > obj.prod.quantity) {
            this.item.lines[searchProdIndex].quantite = 1;
            this.libraryService.onWarning('Quantité en stock atteinte!', 1100, 'top-end');
            return;
        }
        else { }
        if (quantity == 0) {
            this.item.lines[searchProdIndex].quantite = 1;
            this.libraryService.onWarning('La quantité minimum est 1', 1100, 'top-end');
            return;
        }
    }; //fin Check de la quantité
    //add new customer
    PartialSaleCreateComponent.prototype.AddNewCustomer = function () {
        var modalRef = this.modalService.open(new_customer_component_1.NewCustomerComponent, this.constantService.ModalOptionsOne);
    }; //fin add new customer
    // Reset NumPad
    PartialSaleCreateComponent.prototype.ResetNumPad = function () {
        this.numPadAmount = null;
    }; //fin Reset NumPad
    //add NumPadAdd
    PartialSaleCreateComponent.prototype.NumPadAdd = function (num) {
        var inputVal = document.getElementById("numPadAmount").value;
        var concat = inputVal + num;
        var concatLength = JSON.stringify(concat);
        if (concatLength.length > 9) {
            this.ResetNumPad();
        }
        else {
            this.numPadAmount = concat;
        }
    }; //fin NumPadAdd
    //add NumPadAdd
    PartialSaleCreateComponent.prototype.RemoveOnPad = function () {
        var inputVal = document.getElementById("numPadAmount").value;
        var CkeckVal = JSON.parse(inputVal);
        if (CkeckVal < 10) {
            this.numPadAmount = null;
        }
        else {
            var inputOnString = JSON.stringify(inputVal);
            var sliceNum = inputOnString.substring(0, inputOnString.length - 2);
            sliceNum = sliceNum.replace('"', '');
            sliceNum = JSON.parse(sliceNum);
            this.numPadAmount = sliceNum;
        }
    }; //fin NumPadAdd
    //check If Customer Exist
    PartialSaleCreateComponent.prototype.checkIfCustomerExist = function () {
        var selectedCustomer = this.locStorService.readFromSession('Customer');
        if (selectedCustomer === null) {
            return false;
        }
        else {
            return true;
        }
    };
    //fin check If Customer Exist
    //delete Customer
    PartialSaleCreateComponent.prototype.deleteCustomer = function () {
        localStorage.removeItem('Customer');
    };
    //fin delete Customer
    //get paramsMecef
    PartialSaleCreateComponent.prototype.getParamsMecef = function () {
        var _this = this;
        this.saleService.getParamsMecef(this.user)
            .then(function (paramsMecef) {
            var setGroup = paramsMecef.filter(function (param) { return param.key === "DEF_TAX"; })[0];
            var setAIB = paramsMecef.filter(function (param) { return param.key === "AIB"; })[0];
            _this.setGroup = setGroup.value;
            _this.setAIB = setAIB.value;
        }, function (error) {
        });
    }; //fin paramsMecef
    //give up Sale
    PartialSaleCreateComponent.prototype.giveUpSale = function () {
        localStorage.removeItem('Customer');
        this.item = new sale_1.Sale();
        this.lineSize = 0;
        this.ResetNumPad();
        this.Defremise = 0;
        this.Deftva = 0;
    };
    //fin delete Customer
    // get selected Customer
    PartialSaleCreateComponent.prototype.getSelectedCustomer = function () {
        var selectedCustomer = this.locStorService.readFromSession('Customer');
        if (selectedCustomer === null) {
            this.CustomerSelected = false;
        }
        else {
            this.CustomerSelected = true;
            this.customer = selectedCustomer;
            var customerInfo = this.customer.nom + ' ' + this.customer.prenom;
            return customerInfo;
        }
    }; //fin get selected Customer
    //reset filter form
    PartialSaleCreateComponent.prototype.resetFilterForm = function () {
        this.param = new ProductParam_1.ProductParam();
    };
    //fi reset form
    //printData of Last sale
    PartialSaleCreateComponent.prototype.printData = function () {
        this.isPrinting = true;
        this.pdfTitle = "Facture";
        var lastSale = this.locStorService.readFromSession('lastSale');
        if (lastSale !== null) {
            window.open(lastSale, '_blank');
        }
    }; //fin printData
    // OnchangeStatut of Devis Switch
    PartialSaleCreateComponent.prototype.OnchangeStatut = function ($event) {
        this.ResetNumPad();
        this.is_checked = $event.target.checked;
    }; //fin OnchangeStatut of Devis Switch
    //confirmProdRemoveModal
    PartialSaleCreateComponent.prototype.confirmProdRemoveModal = function (item, itemIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sweetalert2_js_1["default"].fire({
                            customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-danger' },
                            text: "\u00CAtes-vous s\u00FBre de retirer le produit : " + item.product.product.name,
                            icon: 'warning',
                            imageHeight: 100,
                            imageWidth: 100,
                            showCancelButton: true,
                            cancelButtonText: "Annuler",
                            confirmButtonText: "Oui je Retire",
                            reverseButtons: true,
                            buttonsStyling: true
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                _this.removeProductLine(itemIndex);
                                _this.libraryService.onSuccess('Produit retiré', 1200, 'top-end');
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input()
    ], PartialSaleCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], PartialSaleCreateComponent.prototype, "created");
    __decorate([
        core_1.ViewChildren('productsList')
    ], PartialSaleCreateComponent.prototype, "listItems");
    PartialSaleCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-partial-sale-create',
            templateUrl: './partial-sale-create.component.html',
            styleUrls: ['./partial-sale-create.component.scss']
        })
    ], PartialSaleCreateComponent);
    return PartialSaleCreateComponent;
}()); //fin confirmProdRemoveModal
exports.PartialSaleCreateComponent = PartialSaleCreateComponent;
