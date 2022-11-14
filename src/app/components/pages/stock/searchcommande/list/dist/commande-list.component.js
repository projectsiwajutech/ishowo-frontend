"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommandeListComponent = void 0;
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var FileSaver = require("file-saver");
var commande_details_component_1 = require("../details/commande-details.component");
var CommandeListComponent = /** @class */ (function () {
    function CommandeListComponent(modalService, orderService, locStorService, ngxService, route, router, libraryService) {
        this.modalService = modalService;
        this.orderService = orderService;
        this.locStorService = locStorService;
        this.ngxService = ngxService;
        this.route = route;
        this.router = router;
        this.libraryService = libraryService;
        //form related objects
        this.visible = true;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
        this.orders = [];
        this.dtColumnsReorderOptions = {};
        this.isCreateVisible = false;
        this.isLoading = false;
        this.isPrinting = false;
        this.isOrdersListPdfVisible = false;
        this.generatedOrdersListPdf = "";
        this.param = new PeriodParam_1.PeriodParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
        this.page = 1;
        this.pageSize = 30;
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
    }
    CommandeListComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getOrders();
        this.limitTable = this.libraryService.getPaginatorLimitList();
        this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
    };
    CommandeListComponent.prototype.ngOnChanges = function () {
    };
    //get list of orders
    CommandeListComponent.prototype.getOrders = function () {
        var _this = this;
        this.isLoading = true;
        this.orders = [];
        this.orderService.getOrders(this.user)
            .then(function (orders) {
            _this.isLoading = false;
            if (orders.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.orders = orders;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getOrders
    //get list of orders
    CommandeListComponent.prototype.searchData = function (form) {
        var _this = this;
        this.param.startDate = form.dateStart;
        this.param.endDate = form.dateEnd;
        this.isLoading = true;
        this.orders = [];
        this.orderService.searchOrders(this.param)
            .then(function (orders) {
            _this.isLoading = false;
            if (orders.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.orders = orders;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin searchData
    //print list of sales
    CommandeListComponent.prototype.printData = function () {
        var _this = this;
        this.ngxService.start();
        this.isPrinting = true;
        this.orderService.printOrders(this.param)
            .then(function (pdf) {
            _this.isPrinting = false;
            var fileBlob = pdf.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_LISTE_COMMANDES.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            _this.ngxService.stop();
            window.open(url, '_blank');
            // this.isOrdersListPdfVisible = true;
            // if(pdf != null)  this.generatedOrdersListPdf = pdf.filename;
        }, function (error) {
            _this.isPrinting = false;
            _this.ngxService.stop();
        });
    }; //fin printData
    //update on close
    CommandeListComponent.prototype.updateOnPdfClose = function (event) {
        this.isOrdersListPdfVisible = event;
    }; //fin updateOnPdfClose
    //track by
    CommandeListComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //select for update
    CommandeListComponent.prototype.viewDetails = function (obj) {
        this.selectedUpObject = obj;
        this.visible = false;
        var modalRef = this.modalService.open(commande_details_component_1.CommandeDetailsComponent, { size: 'xl' });
        modalRef.componentInstance.item = obj;
    }; //fin selectForUpdate
    //hide detail form
    CommandeListComponent.prototype.updateOnClosed = function ($event) {
        this.visible = true;
    };
    //get orderer
    CommandeListComponent.prototype.getOrderer = function (obj) {
        var result = "";
        result = (obj.user !== null) ? (obj.user.lastname + " " + obj.user.firstname) : "";
        return result;
    }; //fin getOrderer
    //hide the form
    CommandeListComponent.prototype.hideForm = function () {
        var link = ['/app/orders_main'];
        this.router.navigate(link);
    };
    //search area
    CommandeListComponent.prototype.getSelectedDate1 = function ($event) {
        this.param.startDate = $event;
    };
    CommandeListComponent.prototype.getSelectedDate2 = function ($event) {
        this.param.endDate = $event;
    };
    //paginate on page change
    CommandeListComponent.prototype.paginate = function (event) {
        this.pageStartIndex = event.first;
        this.pageLimit = event.rows;
    }; //fin
    //get total orders value
    CommandeListComponent.prototype.getTotalOrdersValue = function (items) {
        if (items.length === 0)
            return 0;
        var total = 0;
        total = items
            .map(function (p) { return p.amount; })
            .reduce(function (sum, current) { return sum + current; });
        return total;
    }; //fin getTotalOrdersValue
    //creer une commande
    CommandeListComponent.prototype.createCommand = function () {
        var link = ['/app/orders_create'];
        this.router.navigate(link);
    }; //fin createCommand
    __decorate([
        core_1.Input()
    ], CommandeListComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], CommandeListComponent.prototype, "created");
    CommandeListComponent = __decorate([
        core_1.Component({
            selector: 'app-commande-list',
            templateUrl: './commande-list.component.html',
            styleUrls: ['./commande-list.component.scss']
        })
    ], CommandeListComponent);
    return CommandeListComponent;
}());
exports.CommandeListComponent = CommandeListComponent;
