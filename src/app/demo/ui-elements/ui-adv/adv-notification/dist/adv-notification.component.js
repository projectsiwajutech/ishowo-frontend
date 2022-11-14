"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AdvNotificationComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ng_snotify_1 = require("ng-snotify");
var AdvNotificationComponent = /** @class */ (function () {
    function AdvNotificationComponent(snotifyService) {
        this.snotifyService = snotifyService;
        this.style = 'material';
        this.title = 'Snotify title!';
        this.body = 'Lorem ipsum dolor sit amet!';
        this.timeout = 3000;
        this.position = ng_snotify_1.SnotifyPosition.rightBottom;
        this.progressBar = true;
        this.closeClick = true;
        this.newTop = true;
        this.filterDuplicates = false;
        this.backdrop = -1;
        this.dockMax = 8;
        this.blockMax = 6;
        this.pauseHover = true;
        this.titleMaxLength = 15;
        this.bodyMaxLength = 80;
    }
    AdvNotificationComponent.prototype.ngOnInit = function () {
    };
    AdvNotificationComponent.prototype.getConfig = function () {
        this.snotifyService.setDefaults({
            global: {
                newOnTop: this.newTop,
                maxAtPosition: this.blockMax,
                maxOnScreen: this.dockMax,
                // @ts-ignore
                filterDuplicates: this.filterDuplicates
            }
        });
        return {
            bodyMaxLength: this.bodyMaxLength,
            titleMaxLength: this.titleMaxLength,
            backdrop: this.backdrop,
            position: this.position,
            timeout: this.timeout,
            showProgressBar: this.progressBar,
            closeOnClick: this.closeClick,
            pauseOnHover: this.pauseHover
        };
    };
    AdvNotificationComponent.prototype.onSuccess = function () {
        this.snotifyService.success(this.body, this.title, this.getConfig());
    };
    AdvNotificationComponent.prototype.onInfo = function () {
        this.snotifyService.info(this.body, this.title, this.getConfig());
    };
    AdvNotificationComponent.prototype.onError = function () {
        this.snotifyService.error(this.body, this.title, this.getConfig());
    };
    AdvNotificationComponent.prototype.onWarning = function () {
        this.snotifyService.warning(this.body, this.title, this.getConfig());
    };
    AdvNotificationComponent.prototype.onSimple = function () {
        // const icon = `assets/custom-svg.svg`;
        var icon = "https://placehold.it/48x100";
        this.snotifyService.simple(this.body, this.title, __assign(__assign({}, this.getConfig()), { icon: icon }));
    };
    AdvNotificationComponent.prototype.onAsyncLoading = function () {
        var errorAction = new rxjs_1.Observable(function (observer) {
            setTimeout(function () {
                observer.error({
                    title: 'Error',
                    body: 'Example. Error 404. Service not found'
                });
            }, 2000);
        });
        var successAction = new rxjs_1.Observable(function (observer) {
            setTimeout(function () {
                observer.next({
                    body: 'Still loading.....'
                });
            }, 2000);
            setTimeout(function () {
                observer.next({
                    title: 'Success',
                    body: 'Example. Data loaded!',
                    config: {
                        closeOnClick: true,
                        timeout: 5000,
                        showProgressBar: true
                    }
                });
                observer.complete();
            }, 5000);
        });
        /*
          You should pass Promise or Observable of type Snotify to change some data or do some other actions
          More information how to work with observables:
          https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/create.md
         */
        var _a = this.getConfig(), timeout = _a.timeout, config = __rest(_a, ["timeout"]); // Omit timeout
        this.snotifyService.async('This will resolve with error', 'Async', errorAction, config);
        this.snotifyService.async('This will resolve with success', successAction, config);
        this.snotifyService.async('Called with promise', 'Error async', new Promise(function (resolve, reject) {
            setTimeout(function () {
                return reject({
                    title: 'Error!!!',
                    body: 'We got an example error!',
                    config: {
                        closeOnClick: true
                    }
                });
            }, 1000);
            setTimeout(function () { return resolve(); }, 1500);
        }), config);
    };
    AdvNotificationComponent.prototype.onConfirmation = function () {
        var _this = this;
        /*
        Here we pass an buttons array, which contains of 2 element of type SnotifyButton
         */
        var _a = this.getConfig(), timeout = _a.timeout, closeOnClick = _a.closeOnClick, config = __rest(_a, ["timeout", "closeOnClick"]); // Omit props what i don't need
        this.snotifyService.confirm(this.body, this.title, __assign(__assign({}, config), { buttons: [
                { text: 'Yes', action: function () { return console.log('Clicked: Yes'); }, bold: false },
                { text: 'No', action: function () { return console.log('Clicked: No'); } },
                {
                    text: 'Later',
                    action: function (toast) {
                        _this.snotifyService.remove(toast.id);
                    }
                },
                {
                    text: 'Close',
                    action: function (toast) {
                        _this.snotifyService.remove(toast.id);
                    },
                    bold: true
                }
            ] }));
    };
    AdvNotificationComponent.prototype.onPrompt = function () {
        var _this = this;
        /*
         Here we pass an buttons array, which contains of 2 element of type SnotifyButton
         At the action of the first buttons we can get what user entered into input field.
         At the second we can't get it. But we can remove this toast
         */
        var _a = this.getConfig(), timeout = _a.timeout, closeOnClick = _a.closeOnClick, config = __rest(_a, ["timeout", "closeOnClick"]); // Omit props what i don't need
        this.snotifyService
            .prompt(this.body, this.title, __assign(__assign({}, config), { buttons: [
                {
                    text: 'Yes',
                    action: function (toast) { return console.log('Said Yes: ' + toast.value); }
                },
                {
                    text: 'No',
                    action: function (toast) {
                        _this.snotifyService.remove(toast.id);
                    }
                }
            ], placeholder: 'Enter "ng-snotify" to validate this input' // Max-length = 40
         }))
            .on('input', function (toast) {
            toast.valid = !!toast.value.match('ng-snotify');
        });
    };
    AdvNotificationComponent.prototype.onHtml = function () {
        var html = "<div class=\"snotifyToast__title\"><b>Html Bold Title</b></div>\n    <div class=\"snotifyToast__body\"><i>Html</i> <b>toast</b> <u>content</u></div>";
        this.snotifyService.html(html, this.getConfig());
    };
    AdvNotificationComponent.prototype.onClear = function () {
        this.snotifyService.clear();
    };
    AdvNotificationComponent = __decorate([
        core_1.Component({
            selector: 'app-adv-notification',
            templateUrl: './adv-notification.component.html',
            styleUrls: ['./adv-notification.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], AdvNotificationComponent);
    return AdvNotificationComponent;
}());
exports.AdvNotificationComponent = AdvNotificationComponent;
