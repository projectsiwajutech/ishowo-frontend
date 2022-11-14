"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductStockListComponent = void 0;
var core_1 = require("@angular/core");
var agency_1 = require("src/app/shared/models/agency/agency");
var category_1 = require("src/app/shared/models/category/category");
var compartment_1 = require("src/app/shared/models/compartment/compartment");
var measuretype_1 = require("src/app/shared/models/measuretype/measuretype");
var ProductParam_1 = require("src/app/shared/models/query/ProductParam");
var FileSaver = require("file-saver");
var product_stock_view_component_1 = require("../viewdetail/product-stock-view.component");
var product_on_retail_component_1 = require("../put-on-retail/product-on-retail.component");
var ProductStockListComponent = /** @class */ (function () {
    function ProductStockListComponent(productService, categoryService, measureTypeService, compartmentService, agencyService, locStorService, modalService, ngxService, router) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.measureTypeService = measureTypeService;
        this.compartmentService = compartmentService;
        this.agencyService = agencyService;
        this.locStorService = locStorService;
        this.modalService = modalService;
        this.ngxService = ngxService;
        this.router = router;
        //prodName: string;
        //form related objects
        this.visible = true;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
        this.stock_view = [];
        this.page = 1;
        this.pageSize = 30;
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
    ProductStockListComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getStockView();
        this.getCategories();
        this.getMeasureTypes();
        this.getCompartments();
        this.getAgencies();
        this.param = new ProductParam_1.ProductParam();
    };
    ProductStockListComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.param = new ProductParam_1.ProductParam();
    };
    //get list of products stock view
    ProductStockListComponent.prototype.getStockView = function () {
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
    //search list of products stock view
    ProductStockListComponent.prototype.searchStockView = function () {
        var _this = this;
        this.isLoading = true;
        this.stock_view = [];
        var prodObj = { product_name: this.param.product, product_code: this.param.codebarre, id_profile: 0 };
        this.productService.searchStockView(this.user, prodObj)
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
    }; //fin searchStockView
    //print list of sales
    ProductStockListComponent.prototype.printData = function () {
        var _this = this;
        this.ngxService.start();
        this.isPrinting = true;
        this.productService.printStockView(this.user)
            .then(function (pdf) {
            _this.isPrinting = false;
            var fileBlob = pdf.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_STOCK.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            _this.ngxService.stop();
            window.open(url, '_blank');
            // if(pdf !== null) {
            //   this.isStockViewPdfVisible = true;
            //   this.generatedStockViewPdf = pdf.filename;
            // }
        }, function (error) {
            _this.isPrinting = false;
            _this.ngxService.stop();
        });
    }; //fin printData
    //update on close
    ProductStockListComponent.prototype.updateOnPdfClose = function (event) {
        this.isStockViewPdfVisible = event;
    }; //fin updateOnPdfClose
    //track by
    ProductStockListComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //hide the form
    ProductStockListComponent.prototype.hideViewForm = function () {
        var link = ['/app/orders_main'];
        this.router.navigate(link);
    };
    //select for update
    ProductStockListComponent.prototype.viewDetails = function (obj) {
        this.selectedUpObject = obj;
    }; //fin selectForUpdate
    //expand product stock
    ProductStockListComponent.prototype.expandProduct = function (obj) {
        this.selectedExpdObject = obj;
        var modalRef = this.modalService.open(product_stock_view_component_1.ProductStockViewComponent, { size: 'xl' });
        modalRef.componentInstance.item = obj;
    }; //fin expandProduct
    //view product stock
    ProductStockListComponent.prototype.ViewProduct = function (obj) {
        this.selectedExpdObject = obj;
        var modalRef = this.modalService.open(product_on_retail_component_1.ProductOnRetailComponent, { size: 'xl' });
        modalRef.componentInstance.item = obj;
    }; //fin viewProduct
    //update list on component close
    ProductStockListComponent.prototype.updateOnClose = function ($event) {
        this.selectedUpObject = null;
        this.searchStockView();
    }; //fin updateOnClose
    //update list on hide
    ProductStockListComponent.prototype.updateOnHide = function ($event) {
        this.selectedExpdObject = null;
        this.searchStockView();
    }; //fin updateOnClose
    //get list of categories
    ProductStockListComponent.prototype.getCategories = function () {
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
    //get list of measure types
    ProductStockListComponent.prototype.getMeasureTypes = function () {
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
    ProductStockListComponent.prototype.getCompartments = function () {
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
    ProductStockListComponent.prototype.getAgencies = function () {
        var _this = this;
        this.agencies = [];
        this.agencyService.getAgencies(this.user)
            .then(function (agencies) {
            var emptyObj = new agency_1.Agency();
            emptyObj.id = 0;
            emptyObj.name = "Toutes";
            _this.agencies.push(emptyObj);
            if (agencies !== null) {
                agencies.filter(function (obj) { return _this.agencies.push(obj); });
            }
        }, function (error) {
        });
    }; //fin getAgencies
    //paginate on page change
    ProductStockListComponent.prototype.paginate = function (event) {
        this.pageStartIndex = event.first;
        this.pageLimit = event.rows;
    }; //fin
    //get stock value on selling
    ProductStockListComponent.prototype.getStockValueOnSellingPrice = function (items) {
        if (items.length === 0)
            return 0;
        var total = 0;
        total = items
            .map(function (p) { return p.quantity * p.selling_price; })
            .reduce(function (sum, current) { return sum + current; });
        return total;
    }; //fin getStockValueOnSellingPrice
    //get stock value purchase price
    ProductStockListComponent.prototype.getStockValueOnPurchasePrice = function (items) {
        if (items.length === 0)
            return 0;
        var total = 0;
        total = items
            .map(function (p) { return p.quantity * p.purchase_price; })
            .reduce(function (sum, current) { return sum + current; });
        return total;
    }; //fin getStockValueOnPurchasePrice
    //get stock value revenue
    ProductStockListComponent.prototype.getStockValueOnRevenue = function (items) {
        if (items.length === 0)
            return 0;
        var total = 0;
        total = items
            .map(function (p) { return (p.quantity * (p.selling_price - p.purchase_price)); })
            .reduce(function (sum, current) { return sum + current; });
        return total;
    }; //fin getStockValueOnRevenue
    //hide detail form
    ProductStockListComponent.prototype.updateOnClosed = function ($event) {
        this.visible = true;
    };
    __decorate([
        core_1.Input()
    ], ProductStockListComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], ProductStockListComponent.prototype, "created");
    ProductStockListComponent = __decorate([
        core_1.Component({
            selector: 'app-product-stock-list',
            templateUrl: './product-stock-list.component.html',
            styleUrls: ['./product-stock-list.component.scss']
        })
    ], ProductStockListComponent);
    return ProductStockListComponent;
}());
exports.ProductStockListComponent = ProductStockListComponent;
