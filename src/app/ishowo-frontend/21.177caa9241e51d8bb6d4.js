(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{DsVC:function(e,t,n){"use strict";n.r(t),n.d(t,"NewCommandeListModule",function(){return H});var r=n("ofXK"),i=n("tyNb"),a=n("mrSG"),s=n("fXoL"),o=n("SQ0T");class l{}n("QVta");var d=n("PdH4"),c=n.n(d);class m{}var u=n("1kSV"),p=n("zCCq"),g=n("kwXE"),h=n("6mAB"),v=n("gren");function f(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"div",2),s["\u0275\u0275elementStart"](1,"div",3),s["\u0275\u0275elementStart"](2,"div",4),s["\u0275\u0275elementStart"](3,"div",5),s["\u0275\u0275element"](4,"img",6),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"p",7),s["\u0275\u0275text"](6,"Veuillez Patientez..."),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]())}function S(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"div",2),s["\u0275\u0275elementStart"](1,"div",3),s["\u0275\u0275elementStart"](2,"div",4),s["\u0275\u0275elementStart"](3,"div",5),s["\u0275\u0275element"](4,"img",8),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"p",7),s["\u0275\u0275text"](6,"Aucun r\xe9sultat trouv\xe9 !"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]())}function b(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"tr",12),s["\u0275\u0275elementStart"](1,"td",15),s["\u0275\u0275text"](2),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](3,"td",15),s["\u0275\u0275text"](4),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"td",15),s["\u0275\u0275text"](6),s["\u0275\u0275pipe"](7,"date"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](8,"td",16),s["\u0275\u0275elementStart"](9,"a",17),s["\u0275\u0275listener"]("click",function(){s["\u0275\u0275restoreView"](e);const n=t.$implicit;return s["\u0275\u0275nextContext"](2).launchSavedOrder(n)}),s["\u0275\u0275element"](10,"i",18),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](11,"a",19),s["\u0275\u0275listener"]("click",function(){s["\u0275\u0275restoreView"](e);const n=t.$implicit;return s["\u0275\u0275nextContext"](2).deleteSavedOrder(n.id)}),s["\u0275\u0275element"](12,"i",20),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit,n=t.index;s["\u0275\u0275advance"](2),s["\u0275\u0275textInterpolate1"](" ",n+1," "),s["\u0275\u0275advance"](2),s["\u0275\u0275textInterpolate1"](" ",e.title," "),s["\u0275\u0275advance"](2),s["\u0275\u0275textInterpolate1"](" ",s["\u0275\u0275pipeBind4"](7,3,e.date,"fullDate","","fr")," ")}}function x(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"div",9),s["\u0275\u0275elementStart"](1,"table",10),s["\u0275\u0275elementStart"](2,"thead",11),s["\u0275\u0275elementStart"](3,"tr",12),s["\u0275\u0275elementStart"](4,"th"),s["\u0275\u0275text"](5,"#"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](6,"th"),s["\u0275\u0275text"](7,"Libell\xe9 de la Sauvegarde"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](8,"th"),s["\u0275\u0275text"](9,"Date de Sauvegarde"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](10,"th"),s["\u0275\u0275text"](11,"Actions"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](12,"tbody"),s["\u0275\u0275template"](13,b,13,8,"tr",13),s["\u0275\u0275pipe"](14,"slice"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](15,"ngb-pagination",14),s["\u0275\u0275listener"]("pageChange",function(t){return s["\u0275\u0275restoreView"](e),s["\u0275\u0275nextContext"]().page=t}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}if(2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275advance"](13),s["\u0275\u0275property"]("ngForOf",s["\u0275\u0275pipeBind3"](14,9,e.savedOrders,(e.page-1)*e.pageSize,e.page*e.pageSize))("ngForTrackBy",e.trackByFn),s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("collectionSize",e.savedOrders.length)("page",e.page)("pageSize",e.pageSize)("maxSize",5)("rotate",!0)("ellipses",!1)("boundaryLinks",!0)}}let y=(()=>{class e{constructor(e,t,n,r,i,a){this.activeModal=e,this.orderService=t,this.locStorService=n,this.libraryService=r,this.router=i,this.ngxService=a,this.savedOrders=[],this.isCreateVisible=!1,this.isLoading=!1,this.page=1,this.pageSize=30}ngOnInit(){this.user=this.locStorService.getUser(),this.getSavedOrders()}getSavedOrders(){this.isLoading=!0,this.savedOrders=[],this.orderService.getSavedOrders(this.user).then(e=>{this.isLoading=!1,this.noData=0===e.length,this.savedOrders=e},e=>{this.isLoading=!1})}trackByFn(e,t){return t.id}launchSavedOrder(e){if(this.ngxService.start(),localStorage.getItem("addedProducts")){let t=this.locStorService.readFromSession("addedProducts"),n=this.libraryService.getGoodTable(t,e.product_lines);this.locStorService.saveToSession("addedProducts",n);let r=this.router.url;this.ngxService.stop(),this.activeModal.close(),this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([r])})}else{this.locStorService.saveToSession("addedProducts",e.product_lines);let t=this.router.url;this.ngxService.stop(),this.activeModal.close(),this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([t])})}}deleteSavedOrder(e){this.orderService.deleteSavedOrder(e).then(e=>{this.activeModal.close(),this.libraryService.onSuccess("Sauvegarde supprim\xe9e",1200,"top-end")},e=>{this.libraryService.onError("Echec de la suppression",1200,"top-end")})}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](u.a),s["\u0275\u0275directiveInject"](p.a),s["\u0275\u0275directiveInject"](g.a),s["\u0275\u0275directiveInject"](h.a),s["\u0275\u0275directiveInject"](i.f),s["\u0275\u0275directiveInject"](v.b))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-saved-orders-list"]],decls:3,vars:3,consts:[["class","row d-flex justify-content-center mb-5","style","margin-bottom: 10em;",4,"ngIf"],["class","table-responsive",4,"ngIf"],[1,"row","d-flex","justify-content-center","mb-5",2,"margin-bottom","10em"],[1,"col-md-12","text-center","p-0"],[1,"p-20","pb-3"],[1,"risk-rate"],["src","assets/images/params/spinner.gif","alt","","width","15%"],[1,"text-muted","h3","mb-5"],["src","assets/images/params/liste_vide.png","alt","","width","15%"],[1,"table-responsive"],["id","report-table",1,"table","mb-0"],[1,"thead-light"],[1,"text-center"],["class","text-center",4,"ngFor","ngForOf","ngForTrackBy"],[1,"float-right","mt-2",3,"collectionSize","page","pageSize","maxSize","rotate","ellipses","boundaryLinks","pageChange"],[1,"align-middle","p-0"],[1,"align-middle","p-1"],[1,"btn","btn-icon","btn-outline-success",3,"click"],[1,"fas","fa-file-upload"],[1,"ml-2","btn","btn-icon","btn-outline-danger",3,"click"],[1,"feather","icon-trash-2"]],template:function(e,t){1&e&&(s["\u0275\u0275template"](0,f,7,0,"div",0),s["\u0275\u0275template"](1,S,7,0,"div",0),s["\u0275\u0275template"](2,x,16,13,"div",1)),2&e&&(s["\u0275\u0275property"]("ngIf",t.isLoading),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.noData&&!t.isLoading),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",!t.isLoading&&!t.noData))},directives:[r.l,r.k,u.m],pipes:[r.r,r.d],styles:[""]}),e})();var E=n("9k2O"),C=n("EqsU"),w=n("/n7v"),I=n("3Pt+"),M=n("bFKe"),O=n("Km9j");function k(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"option",24),s["\u0275\u0275text"](1),s["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;s["\u0275\u0275property"]("ngValue",e),s["\u0275\u0275advance"](1),s["\u0275\u0275textInterpolate"](e.name)}}function V(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"div",17),s["\u0275\u0275elementStart"](1,"div",18),s["\u0275\u0275elementStart"](2,"button",19),s["\u0275\u0275text"](3,"FOURNISSEUR"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](4,"select",20,21),s["\u0275\u0275elementStart"](6,"option",22),s["\u0275\u0275text"](7,"Veuillez choisir un fournisseur"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275template"](8,k,2,2,"option",23),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275advance"](8),s["\u0275\u0275property"]("ngForOf",e.suppliers)}}function _(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"option",29),s["\u0275\u0275listener"]("select",function(){s["\u0275\u0275restoreView"](e);const n=t.$implicit;return s["\u0275\u0275nextContext"](2).showAgency(n)}),s["\u0275\u0275text"](1),s["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit;s["\u0275\u0275property"]("ngValue",e),s["\u0275\u0275advance"](1),s["\u0275\u0275textInterpolate1"]("",e.name," ")}}function j(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"div",17),s["\u0275\u0275elementStart"](1,"div",18),s["\u0275\u0275elementStart"](2,"button",19),s["\u0275\u0275text"](3,"RAYON"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](4,"select",25,26),s["\u0275\u0275elementStart"](6,"option",27),s["\u0275\u0275text"](7,"Veuillez choisir un rayon"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275template"](8,_,2,2,"option",28),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275advance"](8),s["\u0275\u0275property"]("ngForOf",e.compartments)}}function L(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"div",30),s["\u0275\u0275elementStart"](1,"div",18),s["\u0275\u0275elementStart"](2,"button",19),s["\u0275\u0275text"](3,"Mt.PAY\xc9"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275element"](4,"input",31,32),s["\u0275\u0275elementEnd"]()),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275advance"](4),s["\u0275\u0275propertyInterpolate"]("ngModel",e.getTotal())}}function P(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"div",30),s["\u0275\u0275elementStart"](1,"div",18),s["\u0275\u0275elementStart"](2,"button",19),s["\u0275\u0275text"](3,"TOTAL"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275element"](4,"input",33,34),s["\u0275\u0275pipe"](6,"formatMoney"),s["\u0275\u0275elementEnd"]()),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275advance"](4),s["\u0275\u0275propertyInterpolate1"]("ngModel","",s["\u0275\u0275pipeBind1"](6,1,e.getTotal())," FCFA")}}const A=function(){return["/stocks/main"]};function B(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"div",35),s["\u0275\u0275elementStart"](1,"div",18),s["\u0275\u0275elementStart"](2,"button",36),s["\u0275\u0275listener"]("click",function(){s["\u0275\u0275restoreView"](e);const t=s["\u0275\u0275nextContext"](),n=s["\u0275\u0275reference"](3);return t.saveModal(n.value)}),s["\u0275\u0275element"](3,"span",37),s["\u0275\u0275text"](4," Enregistrer"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"button",38),s["\u0275\u0275element"](6,"span",39),s["\u0275\u0275text"](7," Retour"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}if(2&e){const e=s["\u0275\u0275nextContext"](),t=s["\u0275\u0275reference"](3);s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("disabled",!t.valid||e.getTotal()<1),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("routerLink",s["\u0275\u0275pureFunction0"](2,A))}}function F(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"div",40),s["\u0275\u0275elementStart"](1,"button",41),s["\u0275\u0275listener"]("click",function(){return s["\u0275\u0275restoreView"](e),s["\u0275\u0275nextContext"]().launchSavedOrderModal()}),s["\u0275\u0275element"](2,"span",42),s["\u0275\u0275text"](3," Importer une Sauvegarde"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}}function T(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"div",43),s["\u0275\u0275text"](1,"LISTE DES PRODUITS AJOUTES"),s["\u0275\u0275elementEnd"]())}function z(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"div",44),s["\u0275\u0275elementStart"](1,"button",45),s["\u0275\u0275element"](2,"span",39),s["\u0275\u0275text"](3," Retour"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("routerLink",s["\u0275\u0275pureFunction0"](1,A)))}function U(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"div",46),s["\u0275\u0275elementStart"](1,"button",47),s["\u0275\u0275listener"]("click",function(){return s["\u0275\u0275restoreView"](e),s["\u0275\u0275nextContext"]().saveForLaterModal()}),s["\u0275\u0275element"](2,"span",48),s["\u0275\u0275text"](3," Sauvegarder pour plus tard"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](4,"button",41),s["\u0275\u0275listener"]("click",function(){return s["\u0275\u0275restoreView"](e),s["\u0275\u0275nextContext"]().launchSavedOrderModal()}),s["\u0275\u0275element"](5,"span",42),s["\u0275\u0275text"](6," Importer une Sauvegarde"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}}function R(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"tr"),s["\u0275\u0275elementStart"](1,"td",53),s["\u0275\u0275text"](2),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](3,"td",54),s["\u0275\u0275elementStart"](4,"input",55,56),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.$implicit.product.product.name=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](6,"td",57),s["\u0275\u0275elementStart"](7,"input",58,59),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.$implicit.product.measure_type.name=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](9,"td",60),s["\u0275\u0275elementStart"](10,"input",61,62),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.$implicit.barcode=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](12,"td",53),s["\u0275\u0275elementStart"](13,"input",63,64),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.$implicit.quantity=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](15,"td",53),s["\u0275\u0275elementStart"](16,"input",65,66),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.$implicit.purchase_price=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](18,"td",53),s["\u0275\u0275elementStart"](19,"input",67,68),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.$implicit.selling_price=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](21,"td",53),s["\u0275\u0275element"](22,"input",69,70),s["\u0275\u0275pipe"](24,"formatMoney"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](25,"td",71),s["\u0275\u0275elementStart"](26,"input",72,73),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.$implicit.expiration_date=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](28,"td",74),s["\u0275\u0275listener"]("click",function(){s["\u0275\u0275restoreView"](e);const n=t.index;return s["\u0275\u0275nextContext"](2).confirmProdRemoveModal(n)}),s["\u0275\u0275elementStart"](29,"button",75),s["\u0275\u0275listener"]("click",function(){s["\u0275\u0275restoreView"](e);const n=t.index;return s["\u0275\u0275nextContext"](2).confirmProdRemoveModal(n)}),s["\u0275\u0275element"](30,"i",76),s["\u0275\u0275text"](31," RETIRER"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit,n=t.index;s["\u0275\u0275advance"](2),s["\u0275\u0275textInterpolate1"](" ",n+1," "),s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("ngModel",e.product.product.name),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("ngModel",e.product.measure_type.name),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("ngModel",e.barcode),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("ngModel",e.quantity),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("ngModel",e.purchase_price),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("ngModel",e.selling_price),s["\u0275\u0275advance"](3),s["\u0275\u0275propertyInterpolate"]("ngModel",s["\u0275\u0275pipeBind1"](24,9,e.purchase_price*e.quantity)),s["\u0275\u0275advance"](4),s["\u0275\u0275property"]("ngModel",e.expiration_date)}}function D(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"table",49),s["\u0275\u0275elementStart"](1,"thead",50),s["\u0275\u0275elementStart"](2,"tr",51),s["\u0275\u0275elementStart"](3,"th"),s["\u0275\u0275text"](4,"#"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"th"),s["\u0275\u0275text"](6,"Produit"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](7,"th"),s["\u0275\u0275text"](8,"Unit\xe9 Mesure"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](9,"th"),s["\u0275\u0275text"](10,"Code Barre"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](11,"th"),s["\u0275\u0275text"](12,"Quantit\xe9"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](13,"th"),s["\u0275\u0275text"](14,"Prix Achat"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](15,"th"),s["\u0275\u0275text"](16,"Prix Vente"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](17,"th"),s["\u0275\u0275text"](18,"Prix Total"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](19,"th"),s["\u0275\u0275text"](20,"Date Expiration"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](21,"th"),s["\u0275\u0275text"](22,"Retrait"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](23,"tbody"),s["\u0275\u0275template"](24,R,32,11,"tr",52),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275advance"](24),s["\u0275\u0275property"]("ngForOf",e.OrderListProducts)}}function N(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"div",77),s["\u0275\u0275elementStart"](1,"div",78),s["\u0275\u0275elementStart"](2,"div",79),s["\u0275\u0275elementStart"](3,"div",80),s["\u0275\u0275element"](4,"img",81),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"p",82),s["\u0275\u0275text"](6,"Aucun Produit \xe0 Afficher"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](7,"button",83),s["\u0275\u0275listener"]("click",function(){return s["\u0275\u0275restoreView"](e),s["\u0275\u0275nextContext"]().createModal()}),s["\u0275\u0275text"](8,"Ajouter"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}}const $=[{path:"",component:(()=>{class e{constructor(e,t,n,r,i,a,o,l){this.supplierService=e,this.modalService=t,this.compartmentService=n,this.orderService=r,this.locStorService=i,this.router=a,this.libraryService=o,this.ngxService=l,this.OrderListProducts=[],this.sum=0,this.compartments=[],this.suppliers=[],this.categories=[],this.products=[],this.measureTypes=[],this.productsTypes=[],this.filteredProducts=[],this.code_barre="",this.visible=!1,this.isSaving=!1,this.isCompleted=!1,this.isSuccess=!1,this.statusMessage="",this.created=new s.EventEmitter}ngOnInit(){this.user=this.locStorService.getUser(),this.item=new l,this.saveItem=new m,this.receiveOrderListProducts(),this.getCompartments(),this.getSuppliers()}ngOnChanges(){this.user=this.locStorService.getUser(),this.item=new l,this.productsBycat=this.products}save(e){this.ngxService.start(),this.isSaving=!0,this.isCompleted=!1,this.statusMessage="",this.orderService.createOrder(this.item).then(e=>{this.isSaving=!1,this.isCompleted=!0,this.isSuccess=!0,this.visible=!1,this.item=new l,this.statusMessage="Commande cr\xe9e avec succ\xe8s",this.created.emit("created"),window.setTimeout(()=>{this.isCompleted=!1},1e3),localStorage.removeItem("addedProducts");let t=this.router.url;this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([t])}),this.ngxService.stop(),c.a.fire({customClass:{container:"myCustomSwal"},icon:"success",title:"Enregistrement R\xe9ussi !",text:"Votre commande a \xe9t\xe9 enregistr\xe9e avec succ\xe8s."})},e=>{this.isSaving=!1,this.isCompleted=!0,this.isSuccess=!1,this.statusMessage="Une erreur est survenue. Veuillez r\xe9essayer";let t=this.router.url;this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([t])}),this.ngxService.stop(),c.a.fire({customClass:{container:"myCustomSwal"},icon:"error",title:"Echec de l'enregistrement !",text:"Une erreur est survenue. Veuillez r\xe9essayer"})})}saveforLater(e){this.ngxService.start(),this.saveItem.id=0,this.saveItem.agent=this.user,this.saveItem.destination=new o.a,this.saveItem.date=new Date,this.saveItem.amount=0,this.saveItem.amount_paid=0,this.saveItem.product_lines=this.OrderListProducts,this.saveItem.is_balanced=!1,this.saveItem.title=e,this.isSaving=!0,this.isCompleted=!1,this.statusMessage="",this.orderService.saveOrder(this.saveItem).then(e=>{this.isSaving=!1,this.isCompleted=!0,this.isSuccess=!0,this.visible=!1,this.item=new l,window.setTimeout(()=>{this.isCompleted=!1},1e3);let t=this.router.url;this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([t])}),this.ngxService.stop(),c.a.fire({customClass:{container:"myCustomSwal"},icon:"success",title:"Sauvegarde Enregistr\xe9e !",text:"Votre sauvegarde a \xe9t\xe9 enregistr\xe9e avec succ\xe8s."})},e=>{this.isSaving=!1,this.isCompleted=!0,this.isSuccess=!1,this.statusMessage="Une erreur est survenue. Veuillez r\xe9essayer";let t=this.router.url;this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([t])}),this.ngxService.stop(),c.a.fire({customClass:{container:"myCustomSwal"},icon:"error",title:"Echec de l'enregistrement !",text:"Une erreur est survenue. Veuillez r\xe9essayer"})})}receiveOrderListProducts(){let e=this.locStorService.readFromSession("addedProducts");this.OrderListProducts=e,null!=this.OrderListProducts&&(this.dataIsAvailable=0!==this.OrderListProducts.length)}getCompartments(){this.compartments=[],this.compartmentService.getCompartments(this.user).then(e=>{this.compartments=e},e=>{})}getSuppliers(){this.suppliers=[],this.supplierService.getSuppliers(this.user).then(e=>{this.suppliers=e},e=>{})}createModal(){this.router.navigate(["/stocks/listcreate"])}saveModal(e){return Object(a.a)(this,void 0,void 0,function*(){if(void 0===e.supplier.id||void 0===e.destination.id)c.a.fire({customClass:{container:"myCustomSwal"},title:"Champs non Renseign\xe9s",text:"Veuillez s\xe9lectionnez un fournisseur et un rayon",icon:"warning"});else{const{value:t}=yield c.a.fire({customClass:{container:"myCustomSwal"},html:"<b>Confirmez-vous ce montant ?</b>",imageUrl:"assets/images/auth/ishowo.png",input:"number",inputValue:e.amount_paid,showCancelButton:!0,cancelButtonText:"Annuler",reverseButtons:!0,confirmButtonText:"Valider la Commande",backdrop:"\n      rgba(0,0,123,0.4)\n      left top\n      no-repeat\n    "});let n={supplier:e.supplier,destination:e.destination},r=t.replaceAll('"',"");r=JSON.parse(t);let i={id:0,agent:this.user,destination:e.destination,date:new Date,amount:this.getTotal(),amount_paid:r,supplier:e.supplier,product_lines:this.OrderListProducts,is_balanced:!1};this.item=i,this.save(n)}})}RemoveProduct(e){this.OrderListProducts.splice(e,1),this.locStorService.saveToSession("addedProducts",this.OrderListProducts)}getTotal(){let e=this.OrderListProducts.reduce((e,t)=>e+t.quantity*t.purchase_price,0);return this.sum=e,this.sum}confirmProdRemoveModal(e){return Object(a.a)(this,void 0,void 0,function*(){yield c.a.fire({customClass:{container:"myCustomSwal",confirmButton:"btn btn-danger"},text:"\xcates-vous s\xfbre de retirer ce Produit",imageUrl:"assets/images/params/delete.png",imageHeight:100,imageWidth:100,showCancelButton:!0,cancelButtonText:'<i class="fas fa-window-close"></i> Annuler',confirmButtonText:'<i class="fas fa-trash-alt"></i> Oui je Retire',reverseButtons:!0,buttonsStyling:!0}).then(t=>{if(t.isConfirmed){this.RemoveProduct(e),this.libraryService.onSuccess("Produit retir\xe9",1200,"top-end");let t=this.router.url;this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([t])})}})})}saveForLaterModal(){return Object(a.a)(this,void 0,void 0,function*(){yield c.a.fire({customClass:{container:"myCustomSwal"},html:"<b>NOM DE SAUVEGARDE</b>",input:"text",inputPlaceholder:"Veuilez nommer votre sauvegarde",showCancelButton:!0,cancelButtonText:'<i class="fas fa-window-close"></i> Annuler',reverseButtons:!0,confirmButtonText:'<i class="fas fa-save"></i> Enregistrer',inputValidator:e=>{if(e.length<1)return"Nom Invalide!"}}).then(e=>{e.isConfirmed&&this.saveforLater(e.value)})})}launchSavedOrderModal(){this.modalService.open(y,{windowClass:"myCustomSwal",size:"xl"})}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](E.a),s["\u0275\u0275directiveInject"](u.j),s["\u0275\u0275directiveInject"](C.a),s["\u0275\u0275directiveInject"](p.a),s["\u0275\u0275directiveInject"](g.a),s["\u0275\u0275directiveInject"](i.f),s["\u0275\u0275directiveInject"](h.a),s["\u0275\u0275directiveInject"](v.b))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-newcommande-list"]],outputs:{created:"created"},features:[s["\u0275\u0275NgOnChangesFeature"]],decls:21,vars:15,consts:[["cardClass","full-card",3,"options","customHeader"],[1,"app-card-header"],["role","form"],["userForm","ngForm"],[1,"row"],["class","form-group mb-0 input-group col-sm-3",4,"ngIf"],["class","form-group mb-0 input-group col-sm-2",4,"ngIf"],["class","form-group mb-0 input-group col-sm-2 d-flex justify-content-end",4,"ngIf"],["class","d-flex justify-content-start col-sm-6",4,"ngIf"],["class","col-sm-6 font-weight-bold text-primary pt-4",4,"ngIf"],["class","d-flex justify-content-end col-sm-6",4,"ngIf"],["class","d-flex justify-content-end col-sm-6 pt-4",4,"ngIf"],[1,"table-responsive"],["class","table table-hover table-bordered",4,"ngIf"],["class","row justify-content-center",4,"ngIf"],[1,"btn","btn-primary","text-center","btn-sm","btn-round","has-ripple","float",2,"z-index","99999",3,"click"],[1,"feather","icon-plus","my-float","text-center","pb-3"],[1,"form-group","mb-0","input-group","col-sm-3"],[1,"input-group-append"],["type","submit",1,"btn","btn-success","font-weight-bold","btn-sm"],["name","supplier","ngModel","DefaultSupplier","required","",1,"form-control"],["supplier","ngModel"],["ngValue","DefaultSupplier","disabled","","selected","",2,"background-color","#c1c1c1"],[3,"ngValue",4,"ngFor","ngForOf"],[3,"ngValue"],["name","destination","ngModel","DefaultCompartment","required","",1,"form-control"],["destination","ngModel"],["ngValue","DefaultCompartment","disabled","","selected","",2,"background-color","#c1c1c1"],[3,"ngValue","select",4,"ngFor","ngForOf"],[3,"ngValue","select"],[1,"form-group","mb-0","input-group","col-sm-2"],["type","number","id","amount_paid","name","amount_paid","name","amount_paid",1,"pl-2","pr-1","form-control","rightnput",3,"ngModel"],["amount_paid",""],["type","text","id","total","disabled","","name","total","name","total",1,"pl-2","pr-1","form-control","rightnput",3,"ngModel"],["total",""],[1,"form-group","mb-0","input-group","col-sm-2","d-flex","justify-content-end"],[1,"btn","btn-primary","pl-2","pr-2","font-weight-bold",3,"disabled","click"],[1,"feather","icon-save"],[1,"btn","btn-light","float-right","pl-1","pr-1","font-weight-bold",3,"routerLink"],[1,"fa","fa-chevron-circle-left"],[1,"d-flex","justify-content-start","col-sm-6"],[1,"btn","btn-primary","font-weight-bold",3,"click"],[1,"fas","fa-file-import"],[1,"col-sm-6","font-weight-bold","text-primary","pt-4"],[1,"d-flex","justify-content-end","col-sm-6"],[1,"btn","btn-light","font-weight-bold",3,"routerLink"],[1,"d-flex","justify-content-end","col-sm-6","pt-4"],[1,"btn","btn-warning","font-weight-bold",3,"click"],[1,"fas","fa-file-download"],[1,"table","table-hover","table-bordered"],[1,"thead-light"],[1,"text-center"],[4,"ngFor","ngForOf"],[1,"pt-2","pb-2","pl-1","pr-1","bg-light"],[1,"pt-2","pb-2","pl-1","pr-1","bg-light",2,"width","20%"],["type","text","disabled","","name","name",1,"form-control",3,"ngModel","ngModelChange"],["name",""],[1,"pt-2","pb-2","pl-1","pr-1","bg-light",2,"width","10%"],["type","text","disabled","","name","type_measure",1,"form-control","centerinput",3,"ngModel","ngModelChange"],["type_measure",""],[1,"pt-2","pb-2","pl-1","pr-1","bg-light",2,"width","12%"],["type","text","placeholder","Champ vide!","disabled","","name","barcode",1,"form-control","centerinput",3,"ngModel","ngModelChange"],["barcode",""],["type","number","name","quantity",1,"form-control","centerinput",3,"ngModel","ngModelChange"],["quantity",""],["type","number","name","purchase_price",1,"form-control","centerinput",3,"ngModel","ngModelChange"],["purchase_price",""],["type","number","name","selling_price",1,"form-control","centerinput",3,"ngModel","ngModelChange"],["selling_price",""],["type","text","disabled","","name","prix_total",1,"form-control","font-weight-bold","text-right","centerinput",2,"background-color","#38ff0024",3,"ngModel"],["prix_total",""],[1,"pt-2","pb-2","bg-light",2,"width","100px"],["type","date","name","expiration_date",1,"form-control",2,"width","100px",3,"ngModel","ngModelChange"],["expiration_date",""],[1,"bg-faded-danger",3,"click"],["data-bs-toggle","tooltip","title","Supprimer",1,"btn","bg-faded-danger","font-weight-bold","p-0","m-0",3,"click"],[1,"fa","fa-trash","text-danger"],[1,"row","justify-content-center"],[1,"col-md-12","text-center","p-0"],[1,"p-20","pb-3"],[1,"risk-rate"],["src","assets/images/params/liste_vide.png","alt","","width","20%"],[1,"text-muted"],[1,"btn","btn-primary","mb-5",3,"click"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"app-card",0),s["\u0275\u0275elementStart"](1,"div",1),s["\u0275\u0275elementStart"](2,"form",2,3),s["\u0275\u0275elementStart"](4,"div",4),s["\u0275\u0275template"](5,V,9,1,"div",5),s["\u0275\u0275template"](6,j,9,1,"div",5),s["\u0275\u0275template"](7,L,6,1,"div",6),s["\u0275\u0275template"](8,P,7,3,"div",6),s["\u0275\u0275template"](9,B,8,3,"div",7),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](10,"div",4),s["\u0275\u0275template"](11,F,4,0,"div",8),s["\u0275\u0275template"](12,T,2,0,"div",9),s["\u0275\u0275template"](13,z,4,2,"div",10),s["\u0275\u0275template"](14,U,7,0,"div",11),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](15,"div",12),s["\u0275\u0275elementStart"](16,"perfect-scrollbar"),s["\u0275\u0275template"](17,D,25,1,"table",13),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275template"](18,N,9,0,"div",14),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](19,"button",15),s["\u0275\u0275listener"]("click",function(){return t.createModal()}),s["\u0275\u0275element"](20,"i",16),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275property"]("options",!1)("customHeader",!0),s["\u0275\u0275advance"](5),s["\u0275\u0275property"]("ngIf",t.dataIsAvailable),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.dataIsAvailable),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.dataIsAvailable),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.dataIsAvailable),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.dataIsAvailable),s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("ngIf",!t.dataIsAvailable),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.dataIsAvailable),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",!t.dataIsAvailable),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.dataIsAvailable),s["\u0275\u0275advance"](2),s["\u0275\u0275styleProp"]("max-height","440px"),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.dataIsAvailable),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",!t.dataIsAvailable))},directives:[w.a,I["\u0275angular_packages_forms_forms_y"],I.NgControlStatusGroup,I.NgForm,r.l,M.b,I.SelectControlValueAccessor,I.NgControlStatus,I.NgModel,I.RequiredValidator,I.NgSelectOption,I["\u0275angular_packages_forms_forms_x"],r.k,I.NumberValueAccessor,I.DefaultValueAccessor,i.g],pipes:[O.a],styles:[""]}),e})()}];let q=(()=>{class e{}return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.j.forChild($)],i.j]}),e})();var G=n("ebz3");let H=(()=>{class e{}return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.b,q,G.a]]}),e})()},Km9j:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n("fXoL");let i=(()=>{class e{transform(e,t){var n="";if(null===e||null==e)return e;for(var r=new String(e).split("").reverse().join(""),i=0;i<r.length/3;i++)n+=" "+r.substring(3*i,3*i+3);return new String(n).split("").reverse().join("")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=r["\u0275\u0275definePipe"]({name:"formatMoney",type:e,pure:!0}),e})()},SQ0T:function(e,t,n){"use strict";n.d(t,"a",function(){return r});class r{}}}]);