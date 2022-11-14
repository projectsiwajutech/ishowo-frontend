"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListDevisComponent = void 0;
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var ListDevisComponent = /** @class */ (function () {
    function ListDevisComponent(saleService, locStorService, route, router, libraryService) {
        this.saleService = saleService;
        this.locStorService = locStorService;
        this.route = route;
        this.router = router;
        this.libraryService = libraryService;
        //form related objects
        this.visible = true;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        this.pageSize = 30;
        this.page = 1;
        this.sales = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.isPrinting = false;
        this.isSalesListPdfVisible = false;
        this.generatedSalesListPdf = "";
        this.param = new PeriodParam_1.PeriodParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
    }
    ListDevisComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getDevis();
        this.limitTable = this.libraryService.getPaginatorLimitList();
        this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
    };
    //get list of devis
    ListDevisComponent.prototype.getDevis = function () {
        var _this = this;
        this.isLoading = true;
        this.sales = [];
        this.saleService.getDevis(this.user)
            .then(function (sales) {
            _this.isLoading = false;
            if (sales.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.sales = sales.filter(function (x) { return x.is_balanced === false; });
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getDevis
    //get list of sales
    ListDevisComponent.prototype.searchData = function (form) {
        var _this = this;
        this.param.startDate = form.dateStart;
        this.param.endDate = form.dateEnd;
        this.isLoading = true;
        this.sales = [];
        this.saleService.searchDevis(this.param)
            .then(function (sales) {
            _this.isLoading = false;
            if (sales.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.sales = sales.filter(function (x) { return x.is_balanced === false; });
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin searchData
    //print list of sales
    ListDevisComponent.prototype.printData = function () {
        var _this = this;
        this.isPrinting = true;
        this.saleService.printSales(this.param)
            .then(function (pdf) {
            _this.isPrinting = false;
            _this.isSalesListPdfVisible = true;
            if (pdf != null)
                _this.generatedSalesListPdf = pdf.filename;
        }, function (error) {
            _this.isPrinting = false;
        });
    }; //fin printData
    //update on close
    ListDevisComponent.prototype.updateOnPdfClose = function (event) {
        this.isSalesListPdfVisible = event;
    }; //fin updateOnPdfClose
    //track by
    ListDevisComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //select for update
    ListDevisComponent.prototype.viewDetails = function (obj) {
        this.selectedUpObject = obj;
        this.visible = false;
    }; //fin selectForUpdate
    //hide detail form
    ListDevisComponent.prototype.updateOnClosed = function ($event) {
        this.visible = true;
    };
    //hide the form
    ListDevisComponent.prototype.hideForm = function () {
        var link = ['/app/sales_main'];
        this.router.navigate(link);
    };
    //get customer
    ListDevisComponent.prototype.getCustomer = function (obj) {
        var result = "";
        if ((obj !== null) && (obj !== undefined) && (obj.nom !== null) && (obj.prenom !== null)) {
            result = obj.nom + " " + obj.prenom + " (" + obj.telephone + ")";
        }
        else if ((obj !== null) && (obj !== undefined) && (obj.social_reason !== null)) {
            result = obj.social_reason + " (" + obj.telephone + ")";
        }
        else {
            result = "ANONYME";
        }
        return result;
    }; //fin getCustomer
    //get seller
    ListDevisComponent.prototype.getSeller = function (obj) {
        var result = "";
        result = (obj.user !== null && obj.user !== undefined && obj.user.lastname !== undefined && obj.user.firstname !== undefined) ?
            (obj.user.lastname + " " + obj.user.firstname) : "";
        return result;
    }; //fin getSeller
    //date de debut
    ListDevisComponent.prototype.getSelectedDateStart = function (event) {
        this.param.startDate = event;
    };
    //date de fin
    ListDevisComponent.prototype.getSelectedDateEnd = function (event) {
        this.param.endDate = event;
    };
    //paginate on page change
    ListDevisComponent.prototype.paginate = function (event) {
        this.pageStartIndex = event.first;
        this.pageLimit = event.rows;
    }; //fin
    __decorate([
        core_1.Input()
    ], ListDevisComponent.prototype, "subject");
    ListDevisComponent = __decorate([
        core_1.Component({
            selector: 'app-list-devis',
            templateUrl: './list-devis.component.html',
            styleUrls: ['./list-devis.component.scss']
        })
    ], ListDevisComponent);
    return ListDevisComponent;
}());
exports.ListDevisComponent = ListDevisComponent;
