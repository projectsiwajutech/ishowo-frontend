"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GenerateBarcodeComponent = void 0;
var core_1 = require("@angular/core");
var agency_1 = require("src/app/shared/models/agency/agency");
var category_1 = require("src/app/shared/models/category/category");
var compartment_1 = require("src/app/shared/models/compartment/compartment");
var measuretype_1 = require("src/app/shared/models/measuretype/measuretype");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var ProductParam_1 = require("src/app/shared/models/query/ProductParam");
var product_on_retail_component_1 = require("../productStocks/put-on-retail/product-on-retail.component");
var GenerateBarcodeComponent = /** @class */ (function () {
    function GenerateBarcodeComponent(productService, categoryService, measureTypeService, compartmentService, agencyService, locStorService, route, router, ngxService, modalService, libraryService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.measureTypeService = measureTypeService;
        this.compartmentService = compartmentService;
        this.agencyService = agencyService;
        this.locStorService = locStorService;
        this.route = route;
        this.router = router;
        this.ngxService = ngxService;
        this.modalService = modalService;
        this.libraryService = libraryService;
        //prodName: string;
        //form related objects
        this.visible = true;
        this.page = 1;
        this.pageSize = 30;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
        this.printParam = new PeriodParam_1.PeriodParam();
        this.stock_view = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.isPrinting = false;
        this.isStockViewPdfVisible = false;
        this.generatedStockViewPdf = "";
        //filter variables
        this.param = new ProductParam_1.ProductParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
    }
    GenerateBarcodeComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.printParam = new PeriodParam_1.PeriodParam();
        this.printParam.agent = this.user;
        this.param = new ProductParam_1.ProductParam();
        this.getStockView();
        this.getCategories();
        this.getMeasureTypes();
        this.getCompartments();
        this.getAgencies();
    };
    GenerateBarcodeComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.param = new ProductParam_1.ProductParam();
        this.printParam = new PeriodParam_1.PeriodParam();
    };
    //get list of products stock view
    GenerateBarcodeComponent.prototype.getStockView = function () {
        var _this = this;
        this.isLoading = true;
        this.stock_view = [];
        this.productService.getStockView(this.user)
            .then(function (stock_view) {
            _this.isLoading = false;
            if (stock_view.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.stock_view = stock_view;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getStockView
    //print list of barcodes
    GenerateBarcodeComponent.prototype.generateBarCodes = function () {
        var _this = this;
        //list of product to generate
        this.ngxService.start();
        var productsChecked = this.stock_view.filter(function (x) { return x.is_checked === true; });
        this.printParam.agent = this.user;
        this.printParam.products = productsChecked;
        this.isPrinting = true;
        //action
        this.productService.generateBarCodes(this.printParam.products, this.printParam.agent)
            .then(function (pdf) {
            _this.isPrinting = false;
            var newRouterLink = _this.router.url;
            _this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                _this.router.navigate([newRouterLink]);
            });
            _this.ngxService.stop();
        }, function (error) {
            _this.ngxService.stop();
            _this.isPrinting = false;
            // alert("Une erreur est survenue");
        });
    }; //fin generateBarCodes
    //update on close
    GenerateBarcodeComponent.prototype.updateOnPdfClose = function (event) {
        this.isStockViewPdfVisible = event;
    }; //fin updateOnPdfClose
    //track by
    GenerateBarcodeComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //hide the form
    GenerateBarcodeComponent.prototype.hideViewForm = function () {
        var link = ['/app/orders_main'];
        this.router.navigate(link);
    };
    //view product stock
    GenerateBarcodeComponent.prototype.ViewProduct = function (obj) {
        this.selectedExpdObject = obj;
        var modalRef = this.modalService.open(product_on_retail_component_1.ProductOnRetailComponent, { size: 'xl' });
        modalRef.componentInstance.item = obj;
    }; //fin viewProduct
    //select for update
    GenerateBarcodeComponent.prototype.viewDetails = function (obj) {
        this.selectedUpObject = obj;
    }; //fin selectForUpdate
    //expand product stock
    GenerateBarcodeComponent.prototype.expandProduct = function (obj) {
        this.selectedExpdObject = obj;
    }; //fin expandProduct
    //get list of categories
    GenerateBarcodeComponent.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.categoryService.getCategories(this.user)
            .then(function (categories) {
            var emptyObj = new category_1.Category();
            emptyObj.id = 0;
            emptyObj.name = "Toutes";
            _this.categories.push(emptyObj);
            categories.filter(function (obj) { return _this.categories.push(obj); });
        }, function (error) {
        });
    }; //fin getCategories
    //get list of measure types
    GenerateBarcodeComponent.prototype.getMeasureTypes = function () {
        var _this = this;
        this.measureTypes = [];
        this.measureTypeService.getMeasureTypes(this.user)
            .then(function (measureTypes) {
            var emptyObj = new measuretype_1.MeasureType();
            emptyObj.id = 0;
            emptyObj.name = "Tous";
            _this.measureTypes.push(emptyObj);
            measureTypes.filter(function (obj) { return _this.measureTypes.push(obj); });
        }, function (error) {
        });
    }; //fin getMeasureTypes
    //get list of compartments
    GenerateBarcodeComponent.prototype.getCompartments = function () {
        var _this = this;
        this.compartments = [];
        this.compartmentService.getCompartments(this.user)
            .then(function (compartments) {
            var emptyObj = new compartment_1.Compartment();
            emptyObj.id = 0;
            emptyObj.name = "Tous";
            _this.compartments.push(emptyObj);
            if (compartments !== null) {
                compartments.filter(function (obj) { return _this.compartments.push(obj); });
            }
        }, function (error) {
        });
    }; //fin getCompartments
    //get list of agencies
    GenerateBarcodeComponent.prototype.getAgencies = function () {
        var _this = this;
        this.agencies = [];
        this.agencyService.getAgencies(this.user)
            .then(function (agencies) {
            var emptyObj = new agency_1.Agency();
            emptyObj.id = 0;
            emptyObj.name = "Toutes";
            _this.agencies.push(emptyObj);
            agencies.filter(function (obj) { return _this.agencies.push(obj); });
        }, function (error) {
        });
    }; //fin getAgencies
    //paginate on page change
    GenerateBarcodeComponent.prototype.paginate = function (event) {
        this.pageStartIndex = event.first;
        this.pageLimit = event.rows;
    }; //fin
    //get stock value on selling
    GenerateBarcodeComponent.prototype.getStockValueOnSellingPrice = function (items) {
        if (items.length === 0)
            return 0;
        var total = 0;
        total = items
            .map(function (p) { return p.quantity * p.selling_price; })
            .reduce(function (sum, current) { return sum + current; });
        return total;
    }; //fin getStockValueOnSellingPrice
    //get stock value purchase price
    GenerateBarcodeComponent.prototype.getStockValueOnPurchasePrice = function (items) {
        if (items.length === 0)
            return 0;
        var total = 0;
        total = items
            .map(function (p) { return p.quantity * p.purchase_price; })
            .reduce(function (sum, current) { return sum + current; });
        return total;
    }; //fin getStockValueOnPurchasePrice
    //get stock value revenue
    GenerateBarcodeComponent.prototype.getStockValueOnRevenue = function (items) {
        if (items.length === 0)
            return 0;
        var total = 0;
        total = items
            .map(function (p) { return (p.quantity * (p.selling_price - p.purchase_price)); })
            .reduce(function (sum, current) { return sum + current; });
        return total;
    }; //fin getStockValueOnRevenue
    //set check state
    GenerateBarcodeComponent.prototype.setCheckState = function ($event, item) {
        item.is_checked = $event.target.checked;
    }; //fin setCheckState
    //get selected stock
    GenerateBarcodeComponent.prototype.getSelectedStock = function () {
        return this.stock_view.filter(function (x) { return x.is_checked === true; }).length;
    }; //end getSelectedStock
    __decorate([
        core_1.Input()
    ], GenerateBarcodeComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], GenerateBarcodeComponent.prototype, "created");
    GenerateBarcodeComponent = __decorate([
        core_1.Component({
            selector: 'app-generate-barcode',
            templateUrl: './generate-barcode.component.html',
            styleUrls: ['./generate-barcode.component.scss']
        })
    ], GenerateBarcodeComponent);
    return GenerateBarcodeComponent;
}());
exports.GenerateBarcodeComponent = GenerateBarcodeComponent;
