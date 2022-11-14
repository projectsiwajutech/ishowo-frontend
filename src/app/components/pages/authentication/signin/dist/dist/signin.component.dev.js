"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
exports.SigninComponent = void 0;

var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");

var core_1 = require("@angular/core");

require("rxjs/add/operator/switchMap");

require("rxjs/add/operator/map");

var profil_1 = require("../../../../shared/models/profil/profil");

var SigninComponent =
/** @class */
function () {
  function SigninComponent(profilService, libraryService, locStorService, route, ngxService, router) {
    var _this = this;

    this.profilService = profilService;
    this.libraryService = libraryService;
    this.locStorService = locStorService;
    this.route = route;
    this.ngxService = ngxService;
    this.router = router;
    this.loadingText = "Veuillez patienter...";
    this.isUserOk = false;
    this.isLoading = false;
    this.refreshTic();
    this.freshTic = window.setInterval(function () {
      return _this.refreshTic();
    }, 3600000);
  }

  SigninComponent.prototype.ngOnInit = function () {
    this.item = new profil_1.Profil();
    this.onLoadFocus();
  }; //login the user


  SigninComponent.prototype.signin = function () {
    var _this = this;

    this.ngxService.start();
    this.isLoading = true;
    this.profilService.login(this.item).then(function (result) {
      _this.isLoading = false;

      if (result === null) {
        _this.ngxService.stop();

        _this.libraryService.onError('Vos paramètres de connexion sont incorrects', 2000, 'top-start');

        return;
      } else {
        _this.locStorService.saveUser(result); //redirect


        window.setTimeout(function () {
          var link = ['dashboard/main'];

          _this.ngxService.stop();

          _this.router.navigate(link);
        }, 100);
      }
    }, function (error) {
      _this.isLoading = false;

      _this.ngxService.stop();

      if (error.status === 400) {
        _this.libraryService.onError(error._body, 2000, 'top-start');

        return;
      } else {
        _this.libraryService.onError('Une erreur est survenue lors de la connexion', 2000, 'top-start');

        return;
      }
    });
  }; //refresh tic


  SigninComponent.prototype.refreshTic = function () {
    this.profilService.refreshTic(this.item).then(function (result) {}, function (error) {});
  }; //fin refreshTic
  //redirection vers nouvelle Licence


  SigninComponent.prototype.NewLicence = function () {
    var link = ['auth/new-licence'];
    this.router.navigate(link);
  }; //fin redirection vers nouvelle Licence
  //redirection vers mis à jour de Licence


  SigninComponent.prototype.ChangeLicence = function () {
    var link = ['auth/change-licence'];
    this.router.navigate(link);
  }; //fin redirection vers mis à jour de Licence
  //check my Licence


  SigninComponent.prototype.checkMyLicence = function () {
    var _this = this;

    this.ngxService.start();
    this.isCheckingProfile = true;
    this.profilService.getUserByCode(this.codeCustomer).then(function (result) {
      _this.isCheckingProfile = false;

      _this.ngxService.stop();

      if (result === null) {
        sweetalert2_js_1["default"].fire({
          customClass: {
            container: 'myCustomSwal'
          },
          icon: 'error',
          title: 'Veuillez vérifier votre code et réessayer'
        }).then(function (result) {
          if (result.isConfirmed) {
            _this.CustomerCodeModal();
          } else {
            _this.CustomerCodeModal();
          }
        });
      } else {
        _this.locStorService.saveToSession('licence_user', result);

        _this.isUserOk = true;

        _this.ChangeLicence();
      }
    }, function (error) {
      _this.isCheckingProfile = false;

      _this.ngxService.stop();

      sweetalert2_js_1["default"].fire({
        customClass: {
          container: 'myCustomSwal'
        },
        icon: 'error',
        title: 'Une erreur est survenue pendant la vérification de votre licence'
      });
    });
  }; //fin checkMyLicence


  SigninComponent.prototype.CustomerCodeModal = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , sweetalert2_js_1["default"].fire({
              customClass: {
                container: 'myCustomSwal',
                confirmButton: 'btn btn-primary'
              },
              title: 'MISE A JOUR DE LICENCE',
              imageUrl: 'assets/images/params/update_licence.png',
              imageHeight: 100,
              imageWidth: 100,
              showCancelButton: true,
              input: 'text',
              inputLabel: 'Code Client',
              inputPlaceholder: 'Veuillez saisir le code Client',
              inputAttributes: {
                maxlength: 5,
                autocapitalize: 'off',
                autocorrect: 'off'
              },
              cancelButtonText: "<i class=\"feather icon-x-circle\"></i> Annuler",
              confirmButtonText: "<i class=\"feather feather icon-refresh-cw\"></i> V\xE9rifier",
              reverseButtons: true,
              buttonsStyling: true
            }).then(function (result) {
              if (result.isConfirmed) {
                _this.codeCustomer = result.value;

                _this.checkMyLicence();
              }
            })];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  }; //Afficher Masquer le mot de passe


  SigninComponent.prototype.showHidePass = function () {
    var input = document.getElementById("password");

    if (input.type === "password") {
      input.type = "text";
      this.showPass = true;
    } else {
      input.type = "password";
      this.showPass = false;
    }
  }; //Premier Champ Actif


  SigninComponent.prototype.onLoadFocus = function () {
    document.getElementById("login").focus();
  };

  SigninComponent = __decorate([core_1.Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
  })], SigninComponent);
  return SigninComponent;
}();

exports.SigninComponent = SigninComponent;