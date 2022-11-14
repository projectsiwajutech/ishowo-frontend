"use strict";
/**
 * Created by Utilisateur on 31/03/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LibraryService = void 0;
/**
 * Created by Utilisateur on 29/03/2017.
 */
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var LibraryService = /** @class */ (function () {
    function LibraryService(http) {
        this.http = http;
        this.limitTable = [5, 10, 20, 30];
        this.pageLimit = 5;
    }
    //get service error text
    LibraryService.prototype.getServiceErrorText = function (error) {
        var errorText = "";
        switch (error.status) {
            case 400:
                errorText = error._body;
                break;
            //case 400: errorText = error._body; break;
            default:
                errorText = "Une erreur est survenue. Veuillez réessayer";
                break;
        }
        return errorText;
    }; //fin getServiceErrorText
    //get list of possible limit on paginators
    LibraryService.prototype.getPaginatorLimitList = function () {
        return this.limitTable;
    }; //fin getPaginatorLimitList
    //get list of possible limit on paginators
    LibraryService.prototype.getPaginatorDefaultLimit = function () {
        return this.pageLimit;
    }; //fin getPaginatorDefaultLimit
    //check phone number
    LibraryService.prototype.checkPhoneNumber = function (phoneNumber) {
        var result = /^(?:9[01456789]|6[0123456789]|5[01234])[0-9]{6}$/.test(phoneNumber);
        if (!result) {
            return false;
        }
        else {
            return true;
        }
    }; //fin check phone number
    //format Phone Number
    LibraryService.prototype.formatPhoneNumber = function (phoneNumber) {
        var result = phoneNumber.substring(5);
        return result;
    }; //fin format phone Number
    //message de succès
    LibraryService.prototype.onSuccess = function (title, timer, position) {
        var Toast = sweetalert2_js_1["default"].mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            didOpen: function (toast) {
                toast.addEventListener('mouseenter', sweetalert2_js_1["default"].stopTimer);
                toast.addEventListener('mouseleave', sweetalert2_js_1["default"].resumeTimer);
            }
        });
        Toast.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'success',
            type: 'danger',
            title: title
        });
    }; //fin Notification: message de succès
    //Notification: message d'erreur
    LibraryService.prototype.onWarning = function (title, timer, position) {
        var Toast = sweetalert2_js_1["default"].mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            didOpen: function (toast) {
                toast.addEventListener('mouseenter', sweetalert2_js_1["default"].stopTimer);
                toast.addEventListener('mouseleave', sweetalert2_js_1["default"].resumeTimer);
            }
        });
        Toast.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'warning',
            title: title
        });
    }; //fin Notification: message d'erreur
    //Notification: message d'avertissement
    LibraryService.prototype.onError = function (title, timer, position) {
        var Toast = sweetalert2_js_1["default"].mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            didOpen: function (toast) {
                toast.addEventListener('mouseenter', sweetalert2_js_1["default"].stopTimer);
                toast.addEventListener('mouseleave', sweetalert2_js_1["default"].resumeTimer);
            }
        });
        Toast.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'error',
            title: title
        });
    }; //fin Notification: message d'avertissement
    // get Good Table
    LibraryService.prototype.getGoodTable = function (tabOne, tabTwo) {
        tabTwo.forEach(function (element) {
            var prodExist = tabOne.filter(function (prod) { return prod.product.product.id == element.product.product.id && prod.product.measure_type.id == element.product.measure_type.id; })[0];
            if (prodExist !== undefined) {
                var index = tabOne.findIndex(function (prod) { return prod.product.product.id == element.product.product.id && prod.product.measure_type.id == element.product.measure_type.id; });
                tabOne[index].quantity = element.quantity + prodExist.quantity;
                tabOne[index].purchase_price = element.purchase_price;
                tabOne[index].selling_price = element.selling_price;
                tabOne[index].date_exp = element.date_exp;
            }
            else {
                tabOne.push(element);
            }
        });
        return tabOne;
    }; //Get Good Table
    LibraryService.prototype.copy = function (obj) {
        return (JSON.parse(JSON.stringify(obj)));
    }; //fin copy
    LibraryService.prototype.showMessage = function (content) {
        return alert(content);
    }; //fin showMessage
    //check valid number
    LibraryService.prototype.isValidNumber = function (value) {
        var content = "" + value;
        var regexQty = /^[0-9]{1,10}$/; //  -?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?  from dom_renderer.ts
        if (!regexQty.test(content)) {
            return false;
        }
        else
            return true;
    }; //fin isValidNumber
    //pad a string
    LibraryService.prototype.padString = function (pad, user_str, pad_pos) {
        if (typeof user_str === 'undefined')
            return pad;
        if (pad_pos == 'l') {
            return (pad + user_str).slice(-pad.length);
        }
        else {
            return (user_str + pad).substring(0, pad.length);
        }
    }; //fin padString
    //convertit une date en chaine de caracteres
    LibraryService.prototype.convertDateToStringShort = function (date) {
        if (date === null || date === undefined)
            return null;
        var theYear = date.getFullYear();
        var theMonth = date.getMonth() + 1;
        theMonth = this.padString("00", theMonth, "l");
        var theDay = date.getDate();
        theDay = this.padString("00", theDay, "l");
        var theHour = date.getHours();
        theHour = this.padString("00", theHour, "l");
        var theMinute = date.getMinutes();
        theMinute = this.padString("00", theMinute, "l");
        //var momDate = moment(date).format();
        var result = theDay + "/" + theMonth + "/" + theYear + " "; //+ + theHour +  ":" + theMinute //momDate.substr(8, 2) + "/" + momDate.substr(5, 2) + "/" + momDate.substr(0, 4);
        return result;
    }; //fin convertDateToStringShort
    //convert 2017-05-27T00:00:00 date to Mon May 22 2017 10:10:10 GMT+0100 (Afr. centrale Ouest) javascript
    LibraryService.prototype.convertStrDateToJsDate = function (dateStr) {
        //day
        var theYear = parseInt(dateStr.substr(0, 4));
        //month
        var theMonth = parseInt(dateStr.substr(5, 2)) - 1;
        //day
        var theDay = parseInt(dateStr.substr(8, 2));
        var theDate;
        theDate = new Date();
        theDate.setFullYear(theYear, theMonth, theDay);
        return theDate;
    }; //fin convertDateToStringShort
    //get financial operation type
    LibraryService.prototype.getFinOperationType = function (type) {
        switch (type) {
            case 1: return "DEPOT";
            case 2: return "RETRAIT";
            case 3: return "TRANSFERT";
            default: return "";
        }
    }; //fin getFinOperationType
    //filter prod list
    LibraryService.prototype.filterProdList = function (stock_view, productSearchName, productSearchBarCode) {
        var filteredList = stock_view.filter(function (x) { return x.product.product.name.toLowerCase().indexOf(productSearchName.toLowerCase()) >= 0; });
        return filteredList;
    }; //end filterProdList
    LibraryService = __decorate([
        core_1.Injectable()
    ], LibraryService);
    return LibraryService;
}());
exports.LibraryService = LibraryService;
