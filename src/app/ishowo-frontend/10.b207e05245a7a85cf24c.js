(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"+PR4":function(e,t,n){"use strict";n.d(t,"a",function(){return r});class r{}},Iab2:function(e,t,n){var r,a;void 0===(a="function"==typeof(r=function(){"use strict";function t(e,t,n){var r=new XMLHttpRequest;r.open("GET",e),r.responseType="blob",r.onload=function(){o(r.response,t,n)},r.onerror=function(){console.error("could not download file")},r.send()}function n(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function r(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(t){var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(n)}}var a="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,i=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),o=a.saveAs||("object"!=typeof window||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!i?function(e,i,o){var s=a.URL||a.webkitURL,l=document.createElement("a");l.download=i=i||e.name||"download",l.rel="noopener","string"==typeof e?(l.href=e,l.origin===location.origin?r(l):n(l.href)?t(e,i,o):r(l,l.target="_blank")):(l.href=s.createObjectURL(e),setTimeout(function(){s.revokeObjectURL(l.href)},4e4),setTimeout(function(){r(l)},0))}:"msSaveOrOpenBlob"in navigator?function(e,a,i){if(a=a||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(function(e,t){return void 0===t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(e,i),a);else if(n(e))t(e,a,i);else{var o=document.createElement("a");o.href=e,o.target="_blank",setTimeout(function(){r(o)})}}:function(e,n,r,o){if((o=o||open("","_blank"))&&(o.document.title=o.document.body.innerText="downloading..."),"string"==typeof e)return t(e,n,r);var s="application/octet-stream"===e.type,l=/constructor/i.test(a.HTMLElement)||a.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);if((c||s&&l||i)&&"undefined"!=typeof FileReader){var d=new FileReader;d.onloadend=function(){var e=d.result;e=c?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=e:location=e,o=null},d.readAsDataURL(e)}else{var p=a.URL||a.webkitURL,m=p.createObjectURL(e);o?o.location=m:location.href=m,o=null,setTimeout(function(){p.revokeObjectURL(m)},4e4)}});a.saveAs=o.saveAs=o,e.exports=o})?r.apply(t,[]):r)||(e.exports=a)},Km9j:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var r=n("fXoL");let a=(()=>{class e{transform(e,t){var n="";if(null===e||null==e)return e;for(var r=new String(e).split("").reverse().join(""),a=0;a<r.length/3;a++)n+=" "+r.substring(3*a,3*a+3);return new String(n).split("").reverse().join("")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=r["\u0275\u0275definePipe"]({name:"formatMoney",type:e,pure:!0}),e})()},LsRi:function(e,t,n){"use strict";n.d(t,"a",function(){return r});class r{}},SQ0T:function(e,t,n){"use strict";n.d(t,"a",function(){return r});class r{}},"Ym+Z":function(e,t,n){"use strict";n.r(t),n.d(t,"PrintBareCodeModule",function(){return z});var r=n("ofXK"),a=n("ebz3"),i=n("tyNb"),o=n("fXoL"),s=n("LsRi"),l=n("iHma"),c=n("SQ0T"),d=n("+PR4"),p=n("vg+W"),m=n("u8Yb"),u=n("Iab2"),g=n("c4Tr"),h=n("TM25"),f=n("hmux"),v=n("2IxJ"),S=n("EqsU"),b=n("h8t+"),y=n("kwXE"),w=n("gren"),E=n("1kSV"),x=n("6mAB"),k=n("/n7v"),C=n("3Pt+"),M=n("vohr"),j=n("Km9j");function I(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"option",22),o["\u0275\u0275text"](1),o["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;o["\u0275\u0275property"]("ngValue",e),o["\u0275\u0275advance"](1),o["\u0275\u0275textInterpolate"](e.name)}}function L(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"option",22),o["\u0275\u0275text"](1),o["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;o["\u0275\u0275property"]("ngValue",e),o["\u0275\u0275advance"](1),o["\u0275\u0275textInterpolate"](e.name)}}function _(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"option",22),o["\u0275\u0275text"](1),o["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;o["\u0275\u0275property"]("ngValue",e),o["\u0275\u0275advance"](1),o["\u0275\u0275textInterpolate"](e.name)}}function V(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"option",22),o["\u0275\u0275text"](1),o["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;o["\u0275\u0275property"]("ngValue",e),o["\u0275\u0275advance"](1),o["\u0275\u0275textInterpolate"](e.name)}}function P(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",23),o["\u0275\u0275elementStart"](1,"div",24),o["\u0275\u0275elementStart"](2,"div",25),o["\u0275\u0275elementStart"](3,"div",26),o["\u0275\u0275element"](4,"img",27),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](5,"p",28),o["\u0275\u0275text"](6,"Veuillez Patientez..."),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]())}function O(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",23),o["\u0275\u0275elementStart"](1,"div",24),o["\u0275\u0275elementStart"](2,"div",25),o["\u0275\u0275elementStart"](3,"div",26),o["\u0275\u0275element"](4,"img",29),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](5,"p",28),o["\u0275\u0275text"](6,"Aucun r\xe9sultat trouv\xe9 !"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]())}function T(e,t){if(1&e){const e=o["\u0275\u0275getCurrentView"]();o["\u0275\u0275elementStart"](0,"tr",33),o["\u0275\u0275elementStart"](1,"td",37),o["\u0275\u0275text"](2),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](3,"td"),o["\u0275\u0275text"](4),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](5,"td",34),o["\u0275\u0275text"](6),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](7,"td"),o["\u0275\u0275text"](8),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](9,"td"),o["\u0275\u0275text"](10),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](11,"td",38),o["\u0275\u0275text"](12),o["\u0275\u0275pipe"](13,"formatMoney"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](14,"td",38),o["\u0275\u0275text"](15),o["\u0275\u0275pipe"](16,"formatMoney"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](17,"td",39),o["\u0275\u0275text"](18),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](19,"td",40),o["\u0275\u0275elementStart"](20,"a",41),o["\u0275\u0275listener"]("click",function(){o["\u0275\u0275restoreView"](e);const n=t.$implicit;return o["\u0275\u0275nextContext"](2).ViewProduct(n)}),o["\u0275\u0275element"](21,"i",42),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](22,"a",43),o["\u0275\u0275elementStart"](23,"input",44),o["\u0275\u0275listener"]("change",function(n){o["\u0275\u0275restoreView"](e);const r=t.$implicit;return o["\u0275\u0275nextContext"](2).setCheckState(n,r)}),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit,n=t.index;o["\u0275\u0275advance"](2),o["\u0275\u0275textInterpolate1"](" ",n+1," "),o["\u0275\u0275advance"](2),o["\u0275\u0275textInterpolate"](e.barcode),o["\u0275\u0275advance"](2),o["\u0275\u0275textInterpolate"](e.product.product.name),o["\u0275\u0275advance"](2),o["\u0275\u0275textInterpolate"](e.product.product.category.name),o["\u0275\u0275advance"](2),o["\u0275\u0275textInterpolate"](e.product.measure_type.name),o["\u0275\u0275advance"](2),o["\u0275\u0275textInterpolate"](o["\u0275\u0275pipeBind1"](13,11,e.purchase_price)),o["\u0275\u0275advance"](3),o["\u0275\u0275textInterpolate"](o["\u0275\u0275pipeBind1"](16,13,e.selling_price)),o["\u0275\u0275advance"](3),o["\u0275\u0275textInterpolate"](e.quantity),o["\u0275\u0275advance"](2),o["\u0275\u0275property"]("placement","top"),o["\u0275\u0275advance"](2),o["\u0275\u0275property"]("placement","top"),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("checked",e.is_checked)}}const R=function(e,t,n,r,a,i){return[e,t,n,r,a,i]};function A(e,t){if(1&e){const e=o["\u0275\u0275getCurrentView"]();o["\u0275\u0275elementStart"](0,"div",30),o["\u0275\u0275elementStart"](1,"table",31),o["\u0275\u0275elementStart"](2,"thead",32),o["\u0275\u0275elementStart"](3,"tr",33),o["\u0275\u0275elementStart"](4,"th"),o["\u0275\u0275text"](5,"#"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](6,"th"),o["\u0275\u0275text"](7,"R\xe9f\xe9rence"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](8,"th",34),o["\u0275\u0275text"](9,"Produit"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](10,"th"),o["\u0275\u0275text"](11,"Cat\xe9gorie"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](12,"th"),o["\u0275\u0275text"](13,"U.Mesure"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](14,"th"),o["\u0275\u0275text"](15,"P.Achat "),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](16,"th"),o["\u0275\u0275text"](17,"P.Vente "),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](18,"th",33),o["\u0275\u0275text"](19,"Stock actuel"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](20,"th"),o["\u0275\u0275text"](21,"Actions"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](22,"tbody"),o["\u0275\u0275template"](23,T,24,15,"tr",35),o["\u0275\u0275pipe"](24,"slice"),o["\u0275\u0275pipe"](25,"stockView"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](26,"ngb-pagination",36),o["\u0275\u0275listener"]("pageChange",function(t){return o["\u0275\u0275restoreView"](e),o["\u0275\u0275nextContext"]().page=t}),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()}if(2&e){const e=o["\u0275\u0275nextContext"]();o["\u0275\u0275advance"](23),o["\u0275\u0275property"]("ngForOf",o["\u0275\u0275pipeBind3"](24,8,o["\u0275\u0275pipeBindV"](25,12,o["\u0275\u0275pureFunction6"](19,R,e.stock_view,e.param.product,e.param.category.id,e.param.measure_type.id,e.param.location.id,e.param.agency.id)),(e.page-1)*e.pageSize,e.page*e.pageSize)),o["\u0275\u0275advance"](3),o["\u0275\u0275property"]("collectionSize",e.stock_view.length)("page",e.page)("pageSize",e.pageSize)("maxSize",5)("rotate",!0)("ellipses",!1)("boundaryLinks",!0)}}const B=function(){return["/stocks/main"]},F=[{path:"",component:(()=>{class e{constructor(e,t,n,r,a,i,s,l,c,d,u){this.productService=e,this.categoryService=t,this.measureTypeService=n,this.compartmentService=r,this.agencyService=a,this.locStorService=i,this.route=s,this.router=l,this.ngxService=c,this.modalService=d,this.libraryService=u,this.visible=!0,this.page=1,this.pageSize=30,this.isSaving=!1,this.isCompleted=!1,this.isSuccess=!1,this.statusMessage="",this.created=new o.EventEmitter,this.printParam=new p.a,this.stock_view=[],this.isCreateVisible=!1,this.isLoading=!1,this.isPrinting=!1,this.isStockViewPdfVisible=!1,this.generatedStockViewPdf="",this.param=new m.a,this.pageStartIndex=0,this.limitTable=[],this.pageLimit=0}ngOnInit(){this.user=this.locStorService.getUser(),this.printParam=new p.a,this.printParam.agent=this.user,this.param=new m.a,this.getStockView(),this.getCategories(),this.getMeasureTypes(),this.getCompartments(),this.getAgencies()}ngOnChanges(){this.user=this.locStorService.getUser(),this.param=new m.a,this.printParam=new p.a}getStockView(){this.isLoading=!0,this.stock_view=[],this.productService.getStockView(this.user).then(e=>{this.isLoading=!1,this.noData=0===e.length,this.stock_view=e},e=>{this.isLoading=!1})}generateBarCodes(){this.ngxService.start();let e=this.stock_view.filter(e=>!0===e.is_checked);this.printParam.agent=this.user,this.printParam.products=e,this.isPrinting=!0,this.productService.printBarCodes(this.printParam).then(e=>{this.isPrinting=!1;let t=e.blob(),n=new Blob([t],{type:"application/pdf"});u.saveAs(n,"ISHOWO_STOCK.pdf");var r=URL.createObjectURL(n);let a=this.router.url;this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([a])}),window.open(r,"_blank"),this.ngxService.stop()},e=>{this.ngxService.stop(),this.isPrinting=!1})}updateOnPdfClose(e){this.isStockViewPdfVisible=e}trackByFn(e,t){return t.id}hideViewForm(){this.router.navigate(["/app/orders_main"])}ViewProduct(e){this.selectedExpdObject=e,this.modalService.open(g.a,{size:"xl"}).componentInstance.item=e}viewDetails(e){this.selectedUpObject=e}expandProduct(e){this.selectedExpdObject=e}getCategories(){this.categories=[],this.categoryService.getCategories(this.user).then(e=>{let t=new l.a;t.id=0,t.name="Toutes",this.categories.push(t),e.filter(e=>this.categories.push(e))},e=>{})}getMeasureTypes(){this.measureTypes=[],this.measureTypeService.getMeasureTypes(this.user).then(e=>{let t=new d.a;t.id=0,t.name="Tous",this.measureTypes.push(t),e.filter(e=>this.measureTypes.push(e))},e=>{})}getCompartments(){this.compartments=[],this.compartmentService.getCompartments(this.user).then(e=>{let t=new c.a;t.id=0,t.name="Tous",this.compartments.push(t),null!==e&&e.filter(e=>this.compartments.push(e))},e=>{})}getAgencies(){this.agencies=[],this.agencyService.getAgencies(this.user).then(e=>{let t=new s.a;t.id=0,t.name="Toutes",this.agencies.push(t),e.filter(e=>this.agencies.push(e))},e=>{})}paginate(e){this.pageStartIndex=e.first,this.pageLimit=e.rows}getStockValueOnSellingPrice(e){if(0===e.length)return 0;let t=0;return t=e.map(e=>e.quantity*e.selling_price).reduce((e,t)=>e+t),t}getStockValueOnPurchasePrice(e){if(0===e.length)return 0;let t=0;return t=e.map(e=>e.quantity*e.purchase_price).reduce((e,t)=>e+t),t}getStockValueOnRevenue(e){if(0===e.length)return 0;let t=0;return t=e.map(e=>e.quantity*(e.selling_price-e.purchase_price)).reduce((e,t)=>e+t),t}setCheckState(e,t){t.is_checked=e.target.checked}getSelectedStock(){return this.stock_view.filter(e=>!0===e.is_checked).length}}return e.\u0275fac=function(t){return new(t||e)(o["\u0275\u0275directiveInject"](h.a),o["\u0275\u0275directiveInject"](f.a),o["\u0275\u0275directiveInject"](v.a),o["\u0275\u0275directiveInject"](S.a),o["\u0275\u0275directiveInject"](b.a),o["\u0275\u0275directiveInject"](y.a),o["\u0275\u0275directiveInject"](i.a),o["\u0275\u0275directiveInject"](i.f),o["\u0275\u0275directiveInject"](w.b),o["\u0275\u0275directiveInject"](E.j),o["\u0275\u0275directiveInject"](x.a))},e.\u0275cmp=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-print-barcode"]],inputs:{subject:"subject"},outputs:{created:"created"},features:[o["\u0275\u0275NgOnChangesFeature"]],decls:47,vars:16,consts:[[3,"options","customHeader"],[1,"app-card-header"],["role","form"],["userForm","ngForm"],[1,"row"],[1,"form-group","mb-0","col-sm-12","d-flex","justify-content-end"],[1,"input-group-append"],[1,"btn","btn-primary","font-weight-bold",3,"click"],[1,"fa","fa-print"],[1,"btn","btn-light","font-weight-bold",3,"routerLink"],[1,"fas","fa-chevron-circle-left"],[1,"form-group","mb-0","input-group","col-sm-3"],[1,"btn","btn-info","font-weight-bold","btn-sm"],["type","text","maxlength","30","name","product","placeholder","Nom du produit",1,"form-control","pl-2",3,"ngModel","ngModelChange","keydown.enter"],["name","cat_prod",1,"form-control",3,"ngModel","ngModelChange"],[3,"ngValue",4,"ngFor","ngForOf"],[1,"form-group","mb-0","input-group","col-sm-2"],["name","measure_type",1,"form-control",3,"ngModel","ngModelChange"],["name","location",1,"form-control",3,"ngModel","ngModelChange"],["name","agency",1,"form-control",3,"ngModel","ngModelChange"],["class","row d-flex justify-content-center mb-5","style","margin-bottom: 10em;",4,"ngIf"],["class","table-responsive table-bordered table-hover",4,"ngIf"],[3,"ngValue"],[1,"row","d-flex","justify-content-center","mb-5",2,"margin-bottom","10em"],[1,"col-md-12","text-center","p-0"],[1,"p-20","pb-3"],[1,"risk-rate"],["src","assets/images/params/spinner.gif","alt","","width","15%"],[1,"text-muted","h3","mb-5"],["src","assets/images/params/liste_vide.png","alt","","width","15%"],[1,"table-responsive","table-bordered","table-hover"],["id","report-table",1,"table","mb-0"],[1,"thead-light"],[1,"text-center"],[1,"text-left"],["class","text-center",4,"ngFor","ngForOf"],[1,"float-right","mt-2",3,"collectionSize","page","pageSize","maxSize","rotate","ellipses","boundaryLinks","pageChange"],[1,"align-middle","p-0"],[1,"font-weight-bold"],[1,"text-center","font-weight-bold","text-danger"],[1,"align-middle","p-0","pt-1","pb-1"],["ngbTooltip","Voir Plus",1,"btn","btn-icon","btn-outline-info","mr-1",3,"placement","click"],[1,"fa","fa-folder-open"],["ngbTooltip","g\xe9n\xe9rer un codeBarre",1,"btn","btn-icon",3,"placement"],["type","checkbox",1,"form-control",3,"checked","change"]],template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"app-card",0),o["\u0275\u0275elementStart"](1,"div",1),o["\u0275\u0275elementStart"](2,"form",2,3),o["\u0275\u0275elementStart"](4,"div",4),o["\u0275\u0275elementStart"](5,"div",5),o["\u0275\u0275elementStart"](6,"div",6),o["\u0275\u0275elementStart"](7,"button",7),o["\u0275\u0275listener"]("click",function(){return t.generateBarCodes()}),o["\u0275\u0275element"](8,"span",8),o["\u0275\u0275text"](9," IMPRIMER"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](10,"button",9),o["\u0275\u0275element"](11,"span",10),o["\u0275\u0275text"](12," RETOUR"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](13,"hr"),o["\u0275\u0275elementStart"](14,"div",4),o["\u0275\u0275elementStart"](15,"div",11),o["\u0275\u0275elementStart"](16,"div",6),o["\u0275\u0275elementStart"](17,"button",12),o["\u0275\u0275text"](18,"Produit"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](19,"input",13),o["\u0275\u0275listener"]("ngModelChange",function(e){return t.param.product=e})("keydown.enter",function(){return 0}),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](20,"div",11),o["\u0275\u0275elementStart"](21,"div",6),o["\u0275\u0275elementStart"](22,"button",12),o["\u0275\u0275text"](23,"Cat\xe9gorie"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](24,"select",14),o["\u0275\u0275listener"]("ngModelChange",function(e){return t.param.category=e}),o["\u0275\u0275template"](25,I,2,2,"option",15),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](26,"div",16),o["\u0275\u0275elementStart"](27,"div",6),o["\u0275\u0275elementStart"](28,"button",12),o["\u0275\u0275text"](29,"T.Mesure"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](30,"select",17),o["\u0275\u0275listener"]("ngModelChange",function(e){return t.param.measure_type=e}),o["\u0275\u0275template"](31,L,2,2,"option",15),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](32,"div",16),o["\u0275\u0275elementStart"](33,"div",6),o["\u0275\u0275elementStart"](34,"button",12),o["\u0275\u0275text"](35,"Rayon"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](36,"select",18),o["\u0275\u0275listener"]("ngModelChange",function(e){return t.param.location=e}),o["\u0275\u0275template"](37,_,2,2,"option",15),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](38,"div",16),o["\u0275\u0275elementStart"](39,"div",6),o["\u0275\u0275elementStart"](40,"button",12),o["\u0275\u0275text"](41,"Agence"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](42,"select",19),o["\u0275\u0275listener"]("ngModelChange",function(e){return t.param.agency=e}),o["\u0275\u0275template"](43,V,2,2,"option",15),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275template"](44,P,7,0,"div",20),o["\u0275\u0275template"](45,O,7,0,"div",20),o["\u0275\u0275template"](46,A,27,26,"div",21),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275property"]("options",!1)("customHeader",!0),o["\u0275\u0275advance"](10),o["\u0275\u0275property"]("routerLink",o["\u0275\u0275pureFunction0"](15,B)),o["\u0275\u0275advance"](9),o["\u0275\u0275property"]("ngModel",t.param.product),o["\u0275\u0275advance"](5),o["\u0275\u0275property"]("ngModel",t.param.category),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngForOf",t.categories),o["\u0275\u0275advance"](5),o["\u0275\u0275property"]("ngModel",t.param.measure_type),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngForOf",t.measureTypes),o["\u0275\u0275advance"](5),o["\u0275\u0275property"]("ngModel",t.param.location),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngForOf",t.compartments),o["\u0275\u0275advance"](5),o["\u0275\u0275property"]("ngModel",t.param.agency),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngForOf",t.agencies),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngIf",t.isLoading),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngIf",t.noData&&!t.isLoading),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngIf",!t.isLoading&&!t.noData))},directives:[k.a,C["\u0275angular_packages_forms_forms_y"],C.NgControlStatusGroup,C.NgForm,i.g,C.DefaultValueAccessor,C.MaxLengthValidator,C.NgControlStatus,C.NgModel,C.SelectControlValueAccessor,r.k,r.l,C.NgSelectOption,C["\u0275angular_packages_forms_forms_x"],E.m,E.t],pipes:[r.r,M.a,j.a],styles:[""]}),e})()}];let U=(()=>{class e{}return e.\u0275mod=o["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=o["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.j.forChild(F)],i.j]}),e})(),z=(()=>{class e{}return e.\u0275mod=o["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=o["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.b,U,a.a]]}),e})()},iHma:function(e,t,n){"use strict";n.d(t,"a",function(){return r});class r{}},u8Yb:function(e,t,n){"use strict";n.d(t,"a",function(){return s});var r=n("SQ0T"),a=n("iHma"),i=n("+PR4"),o=n("LsRi");class s{constructor(){this.product="",this.location=new r.a,this.agency=new o.a,this.category=new a.a,this.measure_type=new i.a,this.codebarre="",this.source=new r.a,this.destination=new r.a}}},vohr:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var r=n("fXoL");let a=(()=>{class e{transform(e,t,n,r,a,i,o){if(!e||!(t||n||r||a||i||o))return e;let s=e.filter(e=>!(!(e.product.product.name.toLowerCase().indexOf(t.toLowerCase())>=0)||void 0!==n&&0!==n&&e.product.product.category.id!==n||void 0!==r&&0!==r&&e.product.measure_type.id!==r||void 0!==a&&0!==a&&e.compartment.id!==a||void 0!==i&&0!==i&&e.compartment.agency.id!==i||!(void 0===o||""===o||e.barcode.toLowerCase().indexOf(o.toLowerCase())>=0)));return null===s&&(s=[]),s}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=r["\u0275\u0275definePipe"]({name:"stockView",type:e,pure:!0}),e})()}}]);