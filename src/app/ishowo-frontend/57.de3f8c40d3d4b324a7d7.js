(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{LAHh:function(e,t,n){"use strict";n.r(t),n.d(t,"CurrentModule",function(){return h});var i=n("ofXK"),r=n("tyNb"),c=n("fXoL"),a=n("e1b5"),l=n("PQpq"),d=n("6mAB"),s=n("kwXE"),o=n("/n7v");const m=[{path:"",component:(()=>{class e{constructor(e,t,n,i,r){this.profilService=e,this.libraryService=t,this.locStorService=n,this.route=i,this.router=r,this.isLoading=!1,this.isLicenceOk=!1,this.iLicence=new a.a,this.visible=!0,this.communicated=new c.EventEmitter}ngOnInit(){this.getCurrentLicence()}getLicenceStatus(e){return!0===e?"ACTIVEE":"INACTIVE"}getCurrentLicence(){this.isLoading=!0,this.profilService.getCurrentLicence().then(e=>{this.isLoading=!1,null!==e?(this.iLicence=e,this.communicated.emit(this.canDisplayAlert())):alert("Une erreur est survenue")},e=>{this.isLoading=!1})}getDescription(){return null==this.iLicence.module?"":this.iLicence.module}getRemainingDays(){if(void 0===this.iLicence)return 0;let e=0,t=0,n=new Date(this.iLicence.expiryDate),i=new Date;return t=Math.abs(n.getTime()-i.getTime()),e=Math.ceil(t/864e5),e}canDisplayAlert(){if(void 0===this.iLicence)return!1;let e=0,t=0,n=new Date(this.iLicence.expiryDate),i=new Date(this.iLicence.activationDate);return t=Math.abs(n.getTime()-i.getTime()),e=Math.ceil(t/864e5),e/2>this.getRemainingDays()}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275directiveInject"](l.a),c["\u0275\u0275directiveInject"](d.a),c["\u0275\u0275directiveInject"](s.a),c["\u0275\u0275directiveInject"](r.a),c["\u0275\u0275directiveInject"](r.f))},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current"]],inputs:{visible:"visible"},outputs:{communicated:"communicated"},decls:36,vars:13,consts:[[1,"row","btn-page"],[1,"col-sm-12"],["cardTitle","Ma Licence",3,"options"],[1,"row"],[1,"col-md-2","col-xs-6","border-right"],[1,"text-info"],[1,"col-md-2","col-xs-6"],[1,"text-success"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"div",0),c["\u0275\u0275elementStart"](1,"div",1),c["\u0275\u0275elementStart"](2,"app-card",2),c["\u0275\u0275elementStart"](3,"div",3),c["\u0275\u0275elementStart"](4,"div",4),c["\u0275\u0275elementStart"](5,"h5"),c["\u0275\u0275text"](6,"CODE CLIENT"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](7,"h4",5),c["\u0275\u0275text"](8),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](9,"div",4),c["\u0275\u0275elementStart"](10,"h5"),c["\u0275\u0275text"](11,"MODULE"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](12,"h4",5),c["\u0275\u0275text"](13),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](14,"div",4),c["\u0275\u0275elementStart"](15,"h5"),c["\u0275\u0275text"](16,"DEBUT"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](17,"h4",5),c["\u0275\u0275text"](18),c["\u0275\u0275pipe"](19,"date"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](20,"div",4),c["\u0275\u0275elementStart"](21,"h5"),c["\u0275\u0275text"](22,"FIN"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](23,"h4",5),c["\u0275\u0275text"](24),c["\u0275\u0275pipe"](25,"date"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](26,"div",4),c["\u0275\u0275elementStart"](27,"h5"),c["\u0275\u0275text"](28,"JOURS RESTANTS"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](29,"h4",5),c["\u0275\u0275text"](30),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](31,"div",6),c["\u0275\u0275elementStart"](32,"h5"),c["\u0275\u0275text"](33,"STATUT"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](34,"h4",7),c["\u0275\u0275text"](35),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()),2&e&&(c["\u0275\u0275advance"](2),c["\u0275\u0275property"]("options",!1),c["\u0275\u0275advance"](6),c["\u0275\u0275textInterpolate"](t.iLicence.code),c["\u0275\u0275advance"](5),c["\u0275\u0275textInterpolate"](t.iLicence.module),c["\u0275\u0275advance"](5),c["\u0275\u0275textInterpolate"](c["\u0275\u0275pipeBind2"](19,7,t.iLicence.activationDate,"dd/MM/yyyy")),c["\u0275\u0275advance"](6),c["\u0275\u0275textInterpolate"](c["\u0275\u0275pipeBind2"](25,10,t.iLicence.expiryDate,"dd/MM/yyyy")),c["\u0275\u0275advance"](6),c["\u0275\u0275textInterpolate1"]("",t.getRemainingDays()," jours"),c["\u0275\u0275advance"](5),c["\u0275\u0275textInterpolate"](t.getLicenceStatus(t.iLicence.isActive)))},directives:[o.a],pipes:[i.d],styles:[""]}),e})()}];let p=(()=>{class e{}return e.\u0275mod=c["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.j.forChild(m)],r.j]}),e})();var u=n("ebz3");let h=(()=>{class e{}return e.\u0275mod=c["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.b,p,u.a]]}),e})()}}]);