(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{"+csz":function(e,t,a){"use strict";a.r(t),a.d(t,"DashAnalyticsModule",function(){return b});var n=a("ofXK"),r=a("tyNb");let l=(()=>{class e{}return e.analyticsChartData={chart:{type:"area",height:50,sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#4680ff"],fill:{type:"solid",opacity:.3},markers:{size:3,opacity:.9,colors:"#fff",strokeColor:"#4680ff",strokeWidth:2,hover:{size:7}},stroke:{curve:"straight",width:3},series:[{name:"series1",data:[25,66,41,89,63,25,44,12,36,9,54,25,66,41,89,63,54,25,66,41,89]}],tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:e=>"Amount Processed :"}},marker:{show:!1}}},e})(),i=(()=>{class e{}return e.analyticsChartData={chart:{type:"bar",height:50,sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#9ccc65"],plotOptions:{bar:{columnWidth:"60%"}},series:[{data:[25,66,41,89,63,25,44,12,36,9,54,25,66,41,89,63,54,25,66,41,89,63,25,44,12]}],xaxis:{crosshairs:{width:1}},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:e=>"Amount Spent :"}},marker:{show:!1}}},e})(),d=(()=>{class e{}return e.analyticsChartData={chart:{type:"area",height:50,sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#ffba57"],fill:{type:"solid",opacity:.3},markers:{size:3,opacity:.9,colors:"#fff",strokeColor:"#ffba57",strokeWidth:2,hover:{size:7}},stroke:{curve:"straight",width:3},series:[{name:"series1",data:[25,44,12,36,9,54,25,66,41,89,25,66,41,89,63,54,25,66,41,89,63]}],tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:e=>"Profit Processed :"}},marker:{show:!1}}},e})(),s=(()=>{class e{}return e.analyticsChartData={chart:{type:"area",height:35,sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#4680ff"],fill:{type:"solid",opacity:0},grid:{padding:{left:5,right:5}},markers:{size:3,opacity:.9,colors:"#4680ff",strokeColor:"#4680ff",strokeWidth:1,hover:{size:4}},stroke:{curve:"straight",width:2},series:[{name:"series1",data:[25,66,41,89,63,25,44,12,36,9,54,25,66,41,89]}],tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:e=>"Site Analysis :"}},marker:{show:!1}}},e})(),o=(()=>{class e{}return e.analyticsChartData={chart:{height:250,type:"donut"},dataLabels:{enabled:!0,dropShadow:{enabled:!1}},series:[85.7,77.56,20.9,10.9,15.8,86.7],colors:["#4680ff","#0e9e4a","#00acc1","#ffba57","#ff5252","#536dfe"],labels:["Facebook ads","Amazon ads","Youtube videos","Google adsense","Twitter ads","News ads"],legend:{show:!0,position:"bottom"}},e})(),m=(()=>{class e{}return e.analyticsChartData={chart:{type:"area",height:40,sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#4680ff"],fill:{type:"solid",opacity:.3},markers:{size:2,opacity:.9,colors:"#4680ff",strokeColor:"#4680ff",strokeWidth:2,hover:{size:4}},stroke:{curve:"straight",width:3},series:[{name:"series1",data:[9,66,41,89,63,25,44,12,36,20,54,25,9]}],tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:e=>"Visits :"}},marker:{show:!1}}},e})(),c=(()=>{class e{}return e.analyticsChartData={chart:{type:"bar",height:40,sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#9ccc65"],plotOptions:{bar:{columnWidth:"60%"}},series:[{data:[25,66,41,89,63,25,44,12,36,9,54,25,66,41,89,63]}],xaxis:{crosshairs:{width:1}},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:e=>"Bounce Rate :"}},marker:{show:!1}}},e})(),h=(()=>{class e{}return e.analyticsChartData={chart:{type:"area",height:40,sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#ff5252"],fill:{type:"solid",opacity:0},markers:{size:2,opacity:.9,colors:"#ff5252",strokeColor:"#ff5252",strokeWidth:2,hover:{size:4}},stroke:{curve:"straight",width:3},series:[{name:"series1",data:[9,66,41,89,63,25,44,12,36,20,54,25,9]}],tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:e=>"Products :"}},marker:{show:!1}}},e})();var p=a("fXoL"),f=a("9OXH"),S=a("/n7v"),v=a("q6ff");const E=[{path:"",component:(()=>{class e{constructor(e){this.apexEvent=e,this.amountProcessedChartData=l.analyticsChartData,this.amountSpentChartData=i.analyticsChartData,this.profitProcessedChartData=d.analyticsChartData,this.seoAnalyticsChartData=s.analyticsChartData,this.trafficChartData=o.analyticsChartData,this.seoChartData1=m.analyticsChartData,this.seoChartData2=c.analyticsChartData,this.seoChartData3=h.analyticsChartData,this.lastDate=0,this.data=[],this.getDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(),10,{min:10,max:90}),this.siteVisitorCAC={chart:{height:300,type:"area",animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:2e3}},toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth"},series:[{name:"active Users :",data:this.data}],colors:["#ff5252"],fill:{type:"gradient",gradient:{shadeIntensity:1,type:"horizontal",opacityFrom:.8,opacityTo:0,stops:[0,100]}},markers:{size:0},xaxis:{type:"datetime",range:7776e5},yaxis:{max:100},legend:{show:!1}}}ngOnInit(){this.intervalSub=setInterval(()=>{this.getNewSeries(this.lastDate,{min:10,max:90}),this.apexEvent.eventChangeSeriesData()},2e3),this.intervalMain=setInterval(()=>{this.resetData(),this.apexEvent.eventChangeSeriesData()},6e4)}ngOnDestroy(){this.intervalSub&&clearInterval(this.intervalSub),this.intervalMain&&clearInterval(this.intervalMain)}getDayWiseTimeSeries(e,t,a){let n=0;for(;n<t;){const t=e,r=Math.floor(Math.random()*(a.max-a.min+1))+a.min;this.data.push({x:t,y:r}),this.lastDate=e,e+=864e5,n++}}resetData(){this.data=this.data.slice(this.data.length-10,this.data.length)}getNewSeries(e,t){const a=e+864e5;this.lastDate=a,this.data.push({x:a,y:Math.floor(Math.random()*(t.max-t.min+1))+t.min})}}return e.\u0275fac=function(t){return new(t||e)(p["\u0275\u0275directiveInject"](f.a))},e.\u0275cmp=p["\u0275\u0275defineComponent"]({type:e,selectors:[["app-dash-analytics"]],decls:174,vars:29,consts:[[1,"row"],[1,"col-md-6","col-xl-4"],["cardClass","amount-card overflow-hidden","blockClass","p-0",3,"hidHeader"],[1,"p-20","p-b-0"],[1,"f-w-400"],[1,"text-muted","f-w-600","f-16"],[1,"text-c-blue"],["chartID","amount-processed",3,"chartConfig"],[1,"text-c-green"],["chartID","amount-spent",3,"chartConfig"],[1,"col-md-12","col-xl-4"],[1,"text-c-yellow"],["chartID","profit-processed",3,"chartConfig"],[1,"col-lg-3","col-md-6"],["footerClass","bg-c-yellow",3,"hidHeader","isCardFooter"],[1,"row","align-items-center"],[1,"col-8"],[1,"text-muted","m-b-0"],[1,"col-4","text-right"],[1,"feather","icon-bar-chart-2","f-28"],[1,"app-card-footer"],[1,"col-9"],[1,"text-white","m-b-0"],[1,"col-3","text-right"],[1,"feather","icon-trending-up","text-white","f-16"],["footerClass","bg-c-green",3,"hidHeader","isCardFooter"],[1,"feather","icon-file-text","f-28"],["footerClass","bg-c-red",3,"hidHeader","isCardFooter"],[1,"text-c-red"],[1,"feather","icon-calendar","f-28"],[1,"feather","icon-trending-down","text-white","f-16"],["footerClass","bg-c-blue",3,"hidHeader","isCardFooter"],[1,"feather","icon-thumbs-down","f-28"],[1,"col-xl-8","col-md-12"],["cardTitle","Real-time Data of Visits",3,"options"],[1,"row","my-2"],[1,"col-auto"],[1,"m-0"],[1,"feather","icon-arrow-up","text-c-green"],[1,"feather","icon-arrow-down","text-c-red"],[1,"col"],["chartID","chart-apex-site-visitor",3,"chartConfig","newData"],[1,"col-xl-4","col-md-12"],[3,"hidHeader"],[1,"text-muted"],["chartID","seo-analytics-1",3,"chartConfig"],["cardClass","bg-c-blue text-white widget-visitor-card","blockClass","text-center",3,"hidHeader"],[1,"text-white"],[1,"feather","icon-file-text"],["cardClass","bg-c-yellow text-white widget-visitor-card","blockClass","text-center",3,"hidHeader"],[1,"feather","icon-award"],[1,"col-lg-6"],["cardTitle","Marketing campaign",3,"options"],["chartID","traffic-chart-1",3,"chartConfig"],[1,"col-6"],[1,"fa","fa-caret-down","text-c-red","m-l-10"],["chartID","seo-chart-1",3,"chartConfig"],[1,"fa","fa-caret-up","text-c-green","m-l-10"],["chartID","seo-chart-2",3,"chartConfig"],["chartID","seo-chart-3",3,"chartConfig"]],template:function(e,t){1&e&&(p["\u0275\u0275elementStart"](0,"div",0),p["\u0275\u0275elementStart"](1,"div",1),p["\u0275\u0275elementStart"](2,"app-card",2),p["\u0275\u0275elementStart"](3,"div",3),p["\u0275\u0275elementStart"](4,"h2",4),p["\u0275\u0275text"](5,"$23,567"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](6,"p",5),p["\u0275\u0275elementStart"](7,"span",6),p["\u0275\u0275text"](8,"Amount"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](9," Processed"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275element"](10,"app-apex-chart",7),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](11,"div",1),p["\u0275\u0275elementStart"](12,"app-card",2),p["\u0275\u0275elementStart"](13,"div",3),p["\u0275\u0275elementStart"](14,"h2",4),p["\u0275\u0275text"](15,"$14,552"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](16,"p",5),p["\u0275\u0275elementStart"](17,"span",8),p["\u0275\u0275text"](18,"Amount"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](19," Spent"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275element"](20,"app-apex-chart",9),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](21,"div",10),p["\u0275\u0275elementStart"](22,"app-card",2),p["\u0275\u0275elementStart"](23,"div",3),p["\u0275\u0275elementStart"](24,"h2",4),p["\u0275\u0275text"](25,"$31,156"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](26,"p",5),p["\u0275\u0275elementStart"](27,"span",11),p["\u0275\u0275text"](28,"Profit"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](29," Processed"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275element"](30,"app-apex-chart",12),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](31,"div",13),p["\u0275\u0275elementStart"](32,"app-card",14),p["\u0275\u0275elementStart"](33,"div",15),p["\u0275\u0275elementStart"](34,"div",16),p["\u0275\u0275elementStart"](35,"h4",11),p["\u0275\u0275text"](36,"$30200"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](37,"h6",17),p["\u0275\u0275text"](38,"All Earnings"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](39,"div",18),p["\u0275\u0275element"](40,"i",19),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](41,"div",20),p["\u0275\u0275elementStart"](42,"div",15),p["\u0275\u0275elementStart"](43,"div",21),p["\u0275\u0275elementStart"](44,"p",22),p["\u0275\u0275text"](45,"% change"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](46,"div",23),p["\u0275\u0275element"](47,"i",24),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](48,"div",13),p["\u0275\u0275elementStart"](49,"app-card",25),p["\u0275\u0275elementStart"](50,"div",15),p["\u0275\u0275elementStart"](51,"div",16),p["\u0275\u0275elementStart"](52,"h4",8),p["\u0275\u0275text"](53,"290+"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](54,"h6",17),p["\u0275\u0275text"](55,"Page Views"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](56,"div",18),p["\u0275\u0275element"](57,"i",26),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](58,"div",20),p["\u0275\u0275elementStart"](59,"div",15),p["\u0275\u0275elementStart"](60,"div",21),p["\u0275\u0275elementStart"](61,"p",22),p["\u0275\u0275text"](62,"% change"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](63,"div",23),p["\u0275\u0275element"](64,"i",24),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](65,"div",13),p["\u0275\u0275elementStart"](66,"app-card",27),p["\u0275\u0275elementStart"](67,"div",15),p["\u0275\u0275elementStart"](68,"div",16),p["\u0275\u0275elementStart"](69,"h4",28),p["\u0275\u0275text"](70,"145"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](71,"h6",17),p["\u0275\u0275text"](72,"Task"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](73,"div",18),p["\u0275\u0275element"](74,"i",29),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](75,"div",20),p["\u0275\u0275elementStart"](76,"div",15),p["\u0275\u0275elementStart"](77,"div",21),p["\u0275\u0275elementStart"](78,"p",22),p["\u0275\u0275text"](79,"% change"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](80,"div",23),p["\u0275\u0275element"](81,"i",30),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](82,"div",13),p["\u0275\u0275elementStart"](83,"app-card",31),p["\u0275\u0275elementStart"](84,"div",15),p["\u0275\u0275elementStart"](85,"div",16),p["\u0275\u0275elementStart"](86,"h4",6),p["\u0275\u0275text"](87,"500"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](88,"h6",17),p["\u0275\u0275text"](89,"Downloads"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](90,"div",18),p["\u0275\u0275element"](91,"i",32),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](92,"div",20),p["\u0275\u0275elementStart"](93,"div",15),p["\u0275\u0275elementStart"](94,"div",21),p["\u0275\u0275elementStart"](95,"p",22),p["\u0275\u0275text"](96,"% change"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](97,"div",23),p["\u0275\u0275element"](98,"i",30),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](99,"div",33),p["\u0275\u0275elementStart"](100,"app-card",34),p["\u0275\u0275elementStart"](101,"div",35),p["\u0275\u0275elementStart"](102,"div",36),p["\u0275\u0275elementStart"](103,"h4",37),p["\u0275\u0275text"](104,"563,756"),p["\u0275\u0275element"](105,"i",38),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](106,"span"),p["\u0275\u0275text"](107,"Visits per Day"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](108,"div",36),p["\u0275\u0275elementStart"](109,"h4",37),p["\u0275\u0275text"](110,"78,569"),p["\u0275\u0275element"](111,"i",39),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](112,"span"),p["\u0275\u0275text"](113,"Total Visitors"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](114,"div",40),p["\u0275\u0275elementStart"](115,"h4",37),p["\u0275\u0275text"](116,"40.05%"),p["\u0275\u0275element"](117,"i",38),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](118,"span"),p["\u0275\u0275text"](119,"Bounce Rate"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275element"](120,"app-apex-chart",41),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](121,"div",42),p["\u0275\u0275elementStart"](122,"app-card",43),p["\u0275\u0275elementStart"](123,"h3"),p["\u0275\u0275text"](124,"20500"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](125,"p",44),p["\u0275\u0275text"](126,"Site Analysis"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275element"](127,"app-apex-chart",45),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](128,"app-card",46),p["\u0275\u0275elementStart"](129,"h2",47),p["\u0275\u0275text"](130,"5,678"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](131,"h6",47),p["\u0275\u0275text"](132,"Daily visitor"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275element"](133,"i",48),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](134,"app-card",49),p["\u0275\u0275elementStart"](135,"h2",47),p["\u0275\u0275text"](136,"5,678"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](137,"h6",47),p["\u0275\u0275text"](138,"Last month visitor"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275element"](139,"i",50),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](140,"div",51),p["\u0275\u0275elementStart"](141,"app-card",52),p["\u0275\u0275element"](142,"app-apex-chart",53),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](143,"div",51),p["\u0275\u0275elementStart"](144,"app-card",43),p["\u0275\u0275elementStart"](145,"div",15),p["\u0275\u0275elementStart"](146,"div",54),p["\u0275\u0275elementStart"](147,"h3"),p["\u0275\u0275text"](148,"$16,756"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](149,"h6",17),p["\u0275\u0275text"](150,"Visits"),p["\u0275\u0275element"](151,"i",55),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](152,"div",54),p["\u0275\u0275element"](153,"app-apex-chart",56),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](154,"app-card",43),p["\u0275\u0275elementStart"](155,"div",15),p["\u0275\u0275elementStart"](156,"div",54),p["\u0275\u0275elementStart"](157,"h3"),p["\u0275\u0275text"](158,"49.54%"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](159,"h6",17),p["\u0275\u0275text"](160,"Bounce Rate"),p["\u0275\u0275element"](161,"i",57),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](162,"div",54),p["\u0275\u0275element"](163,"app-apex-chart",58),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](164,"app-card",43),p["\u0275\u0275elementStart"](165,"div",15),p["\u0275\u0275elementStart"](166,"div",54),p["\u0275\u0275elementStart"](167,"h3"),p["\u0275\u0275text"](168,"1,62,564"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](169,"h6",17),p["\u0275\u0275text"](170,"Products"),p["\u0275\u0275element"](171,"i",55),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](172,"div",54),p["\u0275\u0275element"](173,"app-apex-chart",59),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"]()),2&e&&(p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("hidHeader",!0),p["\u0275\u0275advance"](8),p["\u0275\u0275property"]("chartConfig",t.amountProcessedChartData),p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("hidHeader",!0),p["\u0275\u0275advance"](8),p["\u0275\u0275property"]("chartConfig",t.amountSpentChartData),p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("hidHeader",!0),p["\u0275\u0275advance"](8),p["\u0275\u0275property"]("chartConfig",t.profitProcessedChartData),p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("hidHeader",!0)("isCardFooter",!0),p["\u0275\u0275advance"](17),p["\u0275\u0275property"]("hidHeader",!0)("isCardFooter",!0),p["\u0275\u0275advance"](17),p["\u0275\u0275property"]("hidHeader",!0)("isCardFooter",!0),p["\u0275\u0275advance"](17),p["\u0275\u0275property"]("hidHeader",!0)("isCardFooter",!0),p["\u0275\u0275advance"](17),p["\u0275\u0275property"]("options",!1),p["\u0275\u0275advance"](20),p["\u0275\u0275property"]("chartConfig",t.siteVisitorCAC)("newData",t.data),p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("hidHeader",!0),p["\u0275\u0275advance"](5),p["\u0275\u0275property"]("chartConfig",t.seoAnalyticsChartData),p["\u0275\u0275advance"](1),p["\u0275\u0275property"]("hidHeader",!0),p["\u0275\u0275advance"](6),p["\u0275\u0275property"]("hidHeader",!0),p["\u0275\u0275advance"](7),p["\u0275\u0275property"]("options",!1),p["\u0275\u0275advance"](1),p["\u0275\u0275property"]("chartConfig",t.trafficChartData),p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("hidHeader",!0),p["\u0275\u0275advance"](9),p["\u0275\u0275property"]("chartConfig",t.seoChartData1),p["\u0275\u0275advance"](1),p["\u0275\u0275property"]("hidHeader",!0),p["\u0275\u0275advance"](9),p["\u0275\u0275property"]("chartConfig",t.seoChartData2),p["\u0275\u0275advance"](1),p["\u0275\u0275property"]("hidHeader",!0),p["\u0275\u0275advance"](9),p["\u0275\u0275property"]("chartConfig",t.seoChartData3))},directives:[S.a,v.a],styles:[""]}),e})()}];let x=(()=>{class e{}return e.\u0275mod=p["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=p["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.j.forChild(E)],r.j]}),e})();var y=a("ebz3"),g=a("3Pt+"),C=a("1kSV");let b=(()=>{class e{}return e.\u0275mod=p["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=p["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[n.b,x,y.a,g.FormsModule,g.ReactiveFormsModule,C.p,C.n]]}),e})()}}]);