(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{Iab2:function(e,t,n){var r,i;void 0===(i="function"==typeof(r=function(){"use strict";function t(e,t,n){var r=new XMLHttpRequest;r.open("GET",e),r.responseType="blob",r.onload=function(){o(r.response,t,n)},r.onerror=function(){console.error("could not download file")},r.send()}function n(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function r(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(t){var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(n)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=i.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),o=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(e,a,o){var s=i.URL||i.webkitURL,l=document.createElement("a");l.download=a=a||e.name||"download",l.rel="noopener","string"==typeof e?(l.href=e,l.origin===location.origin?r(l):n(l.href)?t(e,a,o):r(l,l.target="_blank")):(l.href=s.createObjectURL(e),setTimeout(function(){s.revokeObjectURL(l.href)},4e4),setTimeout(function(){r(l)},0))}:"msSaveOrOpenBlob"in navigator?function(e,i,a){if(i=i||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(function(e,t){return void 0===t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(e,a),i);else if(n(e))t(e,i,a);else{var o=document.createElement("a");o.href=e,o.target="_blank",setTimeout(function(){r(o)})}}:function(e,n,r,o){if((o=o||open("","_blank"))&&(o.document.title=o.document.body.innerText="downloading..."),"string"==typeof e)return t(e,n,r);var s="application/octet-stream"===e.type,l=/constructor/i.test(i.HTMLElement)||i.safari,d=/CriOS\/[\d]+/.test(navigator.userAgent);if((d||s&&l||a)&&"undefined"!=typeof FileReader){var c=new FileReader;c.onloadend=function(){var e=c.result;e=d?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=e:location=e,o=null},c.readAsDataURL(e)}else{var m=i.URL||i.webkitURL,p=m.createObjectURL(e);o?o.location=p:location.href=p,o=null,setTimeout(function(){m.revokeObjectURL(p)},4e4)}});i.saveAs=o.saveAs=o,e.exports=o})?r.apply(t,[]):r)||(e.exports=i)},Km9j:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n("fXoL");let i=(()=>{class e{transform(e,t){var n="";if(null===e||null==e)return e;for(var r=new String(e).split("").reverse().join(""),i=0;i<r.length/3;i++)n+=" "+r.substring(3*i,3*i+3);return new String(n).split("").reverse().join("")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=r["\u0275\u0275definePipe"]({name:"formatMoney",type:e,pure:!0}),e})()},UJIf:function(e,t,n){"use strict";n.r(t),n.d(t,"CommandesListModule",function(){return D});var r=n("ofXK"),i=n("tyNb"),a=n("fXoL"),o=n("vg+W"),s=n("Iab2"),l=n("qLKD"),d=n("1kSV"),c=n("zCCq"),m=n("kwXE"),p=n("gren"),u=n("6mAB"),g=n("/n7v"),f=n("3Pt+"),h=n("Km9j");function v(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"div",22),a["\u0275\u0275elementStart"](1,"div",23),a["\u0275\u0275elementStart"](2,"div",24),a["\u0275\u0275elementStart"](3,"div",25),a["\u0275\u0275element"](4,"img",26),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](5,"p",27),a["\u0275\u0275text"](6,"Veuillez Patientez..."),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]())}function b(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"div",22),a["\u0275\u0275elementStart"](1,"div",23),a["\u0275\u0275elementStart"](2,"div",24),a["\u0275\u0275elementStart"](3,"div",25),a["\u0275\u0275element"](4,"img",28),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](5,"p",27),a["\u0275\u0275text"](6,"Aucun r\xe9sultat trouv\xe9 !"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]())}function S(e,t){if(1&e){const e=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"tr",32),a["\u0275\u0275elementStart"](1,"td",35),a["\u0275\u0275text"](2),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](3,"td",35),a["\u0275\u0275text"](4),a["\u0275\u0275pipe"](5,"date"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](6,"td",35),a["\u0275\u0275text"](7),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](8,"td",36),a["\u0275\u0275text"](9),a["\u0275\u0275pipe"](10,"formatMoney"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](11,"td",35),a["\u0275\u0275text"](12),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](13,"td",37),a["\u0275\u0275elementStart"](14,"a",38),a["\u0275\u0275listener"]("click",function(){a["\u0275\u0275restoreView"](e);const n=t.$implicit;return a["\u0275\u0275nextContext"](2).viewDetails(n)}),a["\u0275\u0275element"](15,"i",39),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit,n=t.index,r=a["\u0275\u0275nextContext"](2);a["\u0275\u0275advance"](2),a["\u0275\u0275textInterpolate1"](" ",n+1," "),a["\u0275\u0275advance"](2),a["\u0275\u0275textInterpolate1"](" ",a["\u0275\u0275pipeBind2"](5,5,e.date,"dd/MM/yyyy HH:mm")," "),a["\u0275\u0275advance"](3),a["\u0275\u0275textInterpolate1"](" ",e.supplier.name," "),a["\u0275\u0275advance"](2),a["\u0275\u0275textInterpolate1"](" ",a["\u0275\u0275pipeBind1"](10,8,e.amount_paid)," FCFA "),a["\u0275\u0275advance"](3),a["\u0275\u0275textInterpolate1"](" ",r.getOrderer(e.agent)," ")}}function E(e,t){if(1&e){const e=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"div",29),a["\u0275\u0275elementStart"](1,"table",30),a["\u0275\u0275elementStart"](2,"thead",31),a["\u0275\u0275elementStart"](3,"tr",32),a["\u0275\u0275elementStart"](4,"th"),a["\u0275\u0275text"](5,"#"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](6,"th"),a["\u0275\u0275text"](7,"Date Commande"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](8,"th"),a["\u0275\u0275text"](9,"Fournisseur"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](10,"th"),a["\u0275\u0275text"](11,"Montant commande"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](12,"th"),a["\u0275\u0275text"](13,"Auteur"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](14,"th"),a["\u0275\u0275text"](15,"Voir Plus"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](16,"tbody"),a["\u0275\u0275template"](17,S,16,10,"tr",33),a["\u0275\u0275pipe"](18,"slice"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](19,"ngb-pagination",34),a["\u0275\u0275listener"]("pageChange",function(t){return a["\u0275\u0275restoreView"](e),a["\u0275\u0275nextContext"]().page=t}),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()}if(2&e){const e=a["\u0275\u0275nextContext"]();a["\u0275\u0275advance"](17),a["\u0275\u0275property"]("ngForOf",a["\u0275\u0275pipeBind3"](18,8,e.orders,(e.page-1)*e.pageSize,e.page*e.pageSize)),a["\u0275\u0275advance"](2),a["\u0275\u0275property"]("collectionSize",e.orders.length)("page",e.page)("pageSize",e.pageSize)("maxSize",5)("rotate",!0)("ellipses",!1)("boundaryLinks",!0)}}const w=function(){return["/stocks/main"]},y=[{path:"",component:(()=>{class e{constructor(e,t,n,r,i,s,l){this.modalService=e,this.orderService=t,this.locStorService=n,this.ngxService=r,this.route=i,this.router=s,this.libraryService=l,this.visible=!0,this.isSaving=!1,this.isCompleted=!1,this.isSuccess=!1,this.statusMessage="",this.created=new a.EventEmitter,this.orders=[],this.dtColumnsReorderOptions={},this.isCreateVisible=!1,this.isLoading=!1,this.isPrinting=!1,this.isOrdersListPdfVisible=!1,this.generatedOrdersListPdf="",this.param=new o.a,this.pageStartIndex=0,this.limitTable=[],this.pageLimit=0,this.page=1,this.pageSize=30,this.DefaultDateOne=new Date,this.DefaultDateTwo=new Date}ngOnInit(){this.user=this.locStorService.getUser(),this.param.agent=this.user,this.getOrders(),this.limitTable=this.libraryService.getPaginatorLimitList(),this.pageLimit=this.libraryService.getPaginatorDefaultLimit()}ngOnChanges(){}getOrders(){this.isLoading=!0,this.orders=[],this.orderService.getOrders(this.user).then(e=>{this.isLoading=!1,this.noData=0===e.length,this.orders=e},e=>{this.isLoading=!1})}searchData(e){this.param.startDate=e.dateStart,this.param.endDate=e.dateEnd,this.isLoading=!0,this.orders=[],this.orderService.searchOrders(this.param).then(e=>{this.isLoading=!1,this.noData=0===e.length,this.orders=e},e=>{this.isLoading=!1})}printData(){this.ngxService.start(),this.isPrinting=!0,this.orderService.printOrders(this.param).then(e=>{this.isPrinting=!1;let t=e.blob(),n=new Blob([t],{type:"application/pdf"});s.saveAs(n,"ISHOWO_LISTE_COMMANDES.pdf");var r=URL.createObjectURL(n);this.ngxService.stop(),window.open(r,"_blank")},e=>{this.isPrinting=!1,this.ngxService.stop()})}updateOnPdfClose(e){this.isOrdersListPdfVisible=e}trackByFn(e,t){return t.id}viewDetails(e){this.selectedUpObject=e,this.visible=!1,this.modalService.open(l.a,{size:"xl"}).componentInstance.item=e}updateOnClosed(e){this.visible=!0}getOrderer(e){let t="";return t=null!==e.user?e.user.lastname+" "+e.user.firstname:"",t}hideForm(){this.router.navigate(["/app/orders_main"])}getSelectedDate1(e){this.param.startDate=e}getSelectedDate2(e){this.param.endDate=e}paginate(e){this.pageStartIndex=e.first,this.pageLimit=e.rows}getTotalOrdersValue(e){if(0===e.length)return 0;let t=0;return t=e.map(e=>e.amount).reduce((e,t)=>e+t),t}createCommand(){this.router.navigate(["/app/orders_create"])}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275directiveInject"](d.j),a["\u0275\u0275directiveInject"](c.a),a["\u0275\u0275directiveInject"](m.a),a["\u0275\u0275directiveInject"](p.b),a["\u0275\u0275directiveInject"](i.a),a["\u0275\u0275directiveInject"](i.f),a["\u0275\u0275directiveInject"](u.a))},e.\u0275cmp=a["\u0275\u0275defineComponent"]({type:e,selectors:[["app-commande-list"]],inputs:{subject:"subject"},outputs:{created:"created"},features:[a["\u0275\u0275NgOnChangesFeature"]],decls:32,vars:9,consts:[[3,"options","customHeader"],[1,"app-card-header"],["role","form"],["userForm","ngForm"],[1,"row"],[1,"form-group","mb-0","input-group","col-sm-3"],[1,"input-group-append"],[1,"btn","btn-primary","font-weight-bold","btn-sm"],["type","date","name","dateStart","id","dateStart",1,"pl-2","form-control",3,"ngModel","ngModelChange"],["dateStart","ngModel"],["type","date","name","dateEnd","id","dateEnd",1,"pl-2","form-control",3,"ngModel","ngModelChange"],["dateEnd","ngModel"],["type","submit",1,"col-sm-2"],[1,"btn","btn-success","float-right",3,"click"],[1,"fa","fa-search"],[1,"form-group","mb-0","input-group","col-sm-4","d-flex","justify-content-end"],[1,"btn","btn-primary",3,"click"],[1,"fa","fa-print"],[1,"btn","btn-light",3,"routerLink"],[1,"fas","fa-chevron-circle-left"],["class","row d-flex justify-content-center mb-5","style","margin-bottom: 10em;",4,"ngIf"],["class","table-responsive table-bordered table-hover",4,"ngIf"],[1,"row","d-flex","justify-content-center","mb-5",2,"margin-bottom","10em"],[1,"col-md-12","text-center","p-0"],[1,"p-20","pb-3"],[1,"risk-rate"],["src","assets/images/params/spinner.gif","alt","","width","15%"],[1,"text-muted","h3","mb-5"],["src","assets/images/params/liste_vide.png","alt","","width","15%"],[1,"table-responsive","table-bordered","table-hover"],["id","report-table",1,"table","mb-0"],[1,"thead-light"],[1,"text-center"],["class","text-center",4,"ngFor","ngForOf"],[1,"float-right","mt-2",3,"collectionSize","page","pageSize","maxSize","rotate","ellipses","boundaryLinks","pageChange"],[1,"align-middle","p-0"],[1,"align-middle","p-0","font-weight-bold","text-primary"],[1,"align-middle","p-0","pt-1","pb-1"],[1,"btn","btn-icon","btn-outline-info",3,"click"],[1,"fa","fa-folder-open","p-0"]],template:function(e,t){if(1&e){const e=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"app-card",0),a["\u0275\u0275elementStart"](1,"div",1),a["\u0275\u0275elementStart"](2,"form",2,3),a["\u0275\u0275elementStart"](4,"div",4),a["\u0275\u0275elementStart"](5,"div",5),a["\u0275\u0275elementStart"](6,"div",6),a["\u0275\u0275elementStart"](7,"button",7),a["\u0275\u0275text"](8,"DE"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](9,"input",8,9),a["\u0275\u0275listener"]("ngModelChange",function(e){return t.DefaultDateOne=e}),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](11,"div",5),a["\u0275\u0275elementStart"](12,"div",6),a["\u0275\u0275elementStart"](13,"button",7),a["\u0275\u0275text"](14,"\xc0"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](15,"input",10,11),a["\u0275\u0275listener"]("ngModelChange",function(e){return t.DefaultDateTwo=e}),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](17,"div",12),a["\u0275\u0275elementStart"](18,"button",13),a["\u0275\u0275listener"]("click",function(){a["\u0275\u0275restoreView"](e);const n=a["\u0275\u0275reference"](3);return t.searchData(n.value)}),a["\u0275\u0275element"](19,"span",14),a["\u0275\u0275text"](20," Rechercher"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](21,"div",15),a["\u0275\u0275elementStart"](22,"div",6),a["\u0275\u0275elementStart"](23,"button",16),a["\u0275\u0275listener"]("click",function(){return t.printData()}),a["\u0275\u0275element"](24,"span",17),a["\u0275\u0275text"](25," Imprimer"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](26,"button",18),a["\u0275\u0275element"](27,"span",19),a["\u0275\u0275text"](28," Retour"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275template"](29,v,7,0,"div",20),a["\u0275\u0275template"](30,b,7,0,"div",20),a["\u0275\u0275template"](31,E,20,12,"div",21),a["\u0275\u0275elementEnd"]()}2&e&&(a["\u0275\u0275property"]("options",!1)("customHeader",!0),a["\u0275\u0275advance"](9),a["\u0275\u0275property"]("ngModel",t.DefaultDateOne),a["\u0275\u0275advance"](6),a["\u0275\u0275property"]("ngModel",t.DefaultDateTwo),a["\u0275\u0275advance"](11),a["\u0275\u0275property"]("routerLink",a["\u0275\u0275pureFunction0"](8,w)),a["\u0275\u0275advance"](3),a["\u0275\u0275property"]("ngIf",t.isLoading),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",t.noData&&!t.isLoading),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",!t.isLoading&&!t.noData))},directives:[g.a,f["\u0275angular_packages_forms_forms_y"],f.NgControlStatusGroup,f.NgForm,f.DefaultValueAccessor,f.NgControlStatus,f.NgModel,i.g,r.l,r.k,d.m],pipes:[r.r,r.d,h.a],styles:[""]}),e})()}];let x=(()=>{class e{}return e.\u0275mod=a["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=a["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.j.forChild(y)],i.j]}),e})();var L=n("ebz3");let D=(()=>{class e{}return e.\u0275mod=a["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=a["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},providers:[],imports:[[r.b,x,L.a]]}),e})()}}]);