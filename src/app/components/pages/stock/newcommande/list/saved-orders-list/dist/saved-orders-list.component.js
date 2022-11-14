"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SavedOrdersListComponent = void 0;
var core_1 = require("@angular/core");
var SavedOrdersListComponent = /** @class */ (function () {
    function SavedOrdersListComponent(activeModal, orderService, locStorService, libraryService, router, ngxService) {
        this.activeModal = activeModal;
        this.orderService = orderService;
        this.locStorService = locStorService;
        this.libraryService = libraryService;
        this.router = router;
        this.ngxService = ngxService;
        this.savedOrders = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    SavedOrdersListComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getSavedOrders();
    };
    //get list of saved orders
    SavedOrdersListComponent.prototype.getSavedOrders = function () {
        var _this = this;
        this.isLoading = true;
        this.savedOrders = [];
        this.orderService.getSavedOrders(this.user)
            .then(function (orders) {
            _this.isLoading = false;
            if (orders.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.savedOrders = orders;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getSavedOrders
    //track by
    SavedOrdersListComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //charger une sauvegarde
    SavedOrdersListComponent.prototype.launchSavedOrder = function (item) {
        var _this = this;
        this.ngxService.start();
        if (localStorage.getItem('addedProducts')) {
            var tabOne = this.locStorService.readFromSession('addedProducts');
            var refreshTable = this.libraryService.getGoodTable(tabOne, item.product_lines);
            this.locStorService.saveToSession('addedProducts', refreshTable);
            var newRouterLink_1 = this.router.url;
            this.ngxService.stop();
            this.activeModal.close();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                _this.router.navigate([newRouterLink_1]);
            });
        }
        else {
            this.locStorService.saveToSession('addedProducts', item.product_lines);
            var newRouterLink_2 = this.router.url;
            this.ngxService.stop();
            this.activeModal.close();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                _this.router.navigate([newRouterLink_2]);
            });
        }
    };
    //charger une sauvegarde
    //suppression de sauvegarde
    SavedOrdersListComponent.prototype.deleteSavedOrder = function (id) {
        var _this = this;
        this.orderService.deleteSavedOrder(id)
            .then(function (result) {
            _this.activeModal.close();
            _this.libraryService.onSuccess('Sauvegarde supprimée', 1200, 'top-end');
        }, function (error) {
            _this.libraryService.onError('Echec de la suppression', 1200, 'top-end');
        });
    };
    SavedOrdersListComponent = __decorate([
        core_1.Component({
            selector: 'app-saved-orders-list',
            templateUrl: './saved-orders-list.component.html',
            styleUrls: ['./saved-orders-list.component.scss']
        })
    ], SavedOrdersListComponent);
    return SavedOrdersListComponent;
}());
exports.SavedOrdersListComponent = SavedOrdersListComponent;
