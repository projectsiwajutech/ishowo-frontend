import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { Component, Input, OnInit } from '@angular/core';
import { SupportChartData1 } from './chart/support-chart-data-1';
import { SupportChartData2 } from './chart/support-chart-data-2';
import { SeoChart1 } from './chart/seo-chart-1';
import { SeoChart2 } from './chart/seo-chart-2';
import { SeoChart3 } from './chart/seo-chart-3';
import { Module } from 'src/app/shared/models/module/module';
import { PowerCardChart1 } from './chart/power-card-chart-1';
import { PowerCardChart2 } from './chart/power-card-chart-2';
import { Profil } from 'src/app/shared/models/profil/profil';
import { StatsService } from 'src/app/shared/services/stats/stats.service';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { GlobalReport } from 'src/app/shared/models/stats/globalreport';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { StockLimitService } from 'src/app/shared/services/stocklimit/stocklimit.service';
import { MeasureTypeService } from 'src/app/shared/services/measuretype/measuretype.service';
import { ProductParam } from 'src/app/shared/models/query/ProductParam';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { SaleTarget } from 'src/app/shared/models/saletarget/saletarget';
import { SaleTargetService } from 'src/app/shared/services/sale/saletarget.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Formule } from 'src/app/shared/models/formule/formule';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormatMoneyPipe } from 'src/app/shared/pipes/format_money/format_money.pipe';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Requestpay } from 'src/app/shared/models/requestpay/requestpay';



@Component({
  selector: 'app-dash-default',
  templateUrl: './dash-default.component.html',
  styleUrls: ['./dash-default.component.scss']
})
export class DashDefaultComponent implements OnInit {

  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();
  parame: ProductParam = new ProductParam();

  isLoading: boolean = false;
  isLoadingOne: boolean = false; noDataOne: boolean = true;
  noData: boolean = true; page: number = 1; pageSize: number = 30;

  //report var
  report: GlobalReport = new GlobalReport();
  isLoadingStats: boolean = false;
  param: PeriodParam = new PeriodParam();
  @Input() is_part_visible: boolean = true;
  @Input() title: string = "Statistiques globales";

  measureTypes: MeasureType[];
  compartments: Compartment[];
  underStockList: ProductInStock[] = [];
  saleTargetList: SaleTarget[] = [];

  //user connected
  user: Profil;

  public supportChartData1: any;
  public supportChartData2: any;
  public seoChartData1: any;
  public seoChartData2: any;
  public seoChartData3: any;
  public powerCardChartData1: any;
  public powerCardChartData2: any;

  modulesList: {};
  formulesList: Formule[];
  formulesListOfModule: Formule[];

  payment : Requestpay = new Requestpay();

  constructor(
    private statsService: StatsService,
    private stockLimitService: StockLimitService,
    private productService: ProductService,
    private measureTypeService: MeasureTypeService,
    private profilService: ProfileService,
    private saletargetService: SaleTargetService,
    private locStorService: LocalStorageService,
    private libraryService: LibraryService,
      private  config: NgbModalConfig,
     private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,

  ) {
    this.supportChartData1 = SupportChartData1.supportChartData;
    this.supportChartData2 = SupportChartData2.supportChartData;
    this.seoChartData1 = SeoChart1.seoChartData;
    this.seoChartData2 = SeoChart2.seoChartData;
    this.seoChartData3 = SeoChart3.seoChartData;
    this.powerCardChartData1 = PowerCardChart1.powerCardChartData;
    this.powerCardChartData2 = PowerCardChart2.powerCardChartData;
    this.saveGroup();
    config.backdrop = 'static';
    config.keyboard = false;  

    this.getModulesList();
    this.getFormulesList();
  }


  ngOnInit() {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getCurrentStats();
    this.getMeasureTypes();
    console.log(this.user)
    this.saveGroup()
  }

  open(content) {
    this.modalService.open(content);
  }

   //get modules list
   getModulesList(): void {
    this.profilService.getModules()
      .then((result: any) => {
        this.modulesList = result.data[1];
        console.log( this.modulesList)
      }, (error: any) => { }
      );
  }//fin getModulesList

  //get formules list
  getFormulesList(): void {
    this.profilService.getFormules()
      .then((result: any) => {
        this.formulesList = result.data;
      }, (error: any) => { }
      );
  }//fin getFormulesList

  //get modules list
  getFormulesListById(id: number, type: any) {
    let formule: Formule = this.formulesList.filter(x => (x.module_id == id) && (x.type === type))[0];
    if (formule === null || formule === undefined){
      formule = new Formule()
    }
    console.log(formule)
    return formule.montant + " Fcfa (" + formule.duree + " Jours)";
  }//fin getModulesList

    //modal d'avertissement du processus de payement
    async LaunchPayModal(module: any, type: any) {
      let formule: Formule = this.formulesList.filter(x => (x.module_id == module.id) && (x.type === type))[0];
     
        let formatAmount = new FormatMoneyPipe().transform(formule.montant, '');
        await Swal.fire({
          customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-primary', cancelButton: 'btn btn-light', denyButton: 'btn btn-warning' },
          icon: 'info',
          title: 'DEMARRAGE DU PROCESSUS DE PAIEMENT',
          html: '<br><p class="text-center h4"> Un processus de paiement d\'un montant de <span class="badge badge-info mt-1">' + formatAmount +
            ' FCFA </span> sera lancé sur le numéro de téléphone suivant : <span class="badge badge-info mt-1">' + this.user.user.phone + '</span> </p>' +
            '<p class="text-center font-weight-bold h3 text-warning"> Voulez-vous modifier ce numéro ?</p>',
          showDenyButton: true,
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonText: `<i class="feather icon-check-circle"></i> Continuer`,
          denyButtonText: `<i class="feather icon-edit-1"></i> Oui, Modifier`,
          denyButtonColor: '#ff9800',
          cancelButtonText: `<i class="feather icon-x-circle"></i> Annuler`,
          reverseButtons: true,
          buttonsStyling: true,
        }).then((result) => {
          if (result.isConfirmed) {
             this.paymentRequest(module, formule.montant, formule.duree,this.user.user.phone)
           
          } else if (result.isDenied) {
            this.changePayNumber(module, type);
          }
        });
      
    }
    //fin modal d'avertissement du processus de payement


    //change Transaction phone number
  async changePayNumber(module: any, type:any) {
    let format = this.user.user.phone.substring(5);
    let formatScreen = format.replaceAll('-', '');
    await Swal.fire({
      customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-primary' },
      title: 'MODIFICATION DU NUMERO DE PAIEMENT',
      imageUrl: 'assets/images/params/payPhoneNumb.png',
      imageHeight: 122,
      imageWidth: 200,
      showCancelButton: true,
      input: 'text',
      inputLabel: 'Numéro de paiement',
      inputValue: formatScreen,
      inputPlaceholder: '90102030',
      inputValidator: (value) => {
        let result = /^(?:9[01456789]|6[0123456789]|5[01234])[0-9]{6}$/.test(value);
        if (!value || !result) {
          return 'Numéro de téléphone Invalide!'
        }
      },
      inputAttributes: {
        maxlength: 8,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      cancelButtonText: `<i class="feather icon-x-circle"></i> Annuler`,
      confirmButtonText: `<i class="feather icon-check-circle"></i> Confirmer`,
      reverseButtons: true,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let format = result.value.match(/\d{2}/g).join('-');
        this.user.user.phone = '+229' + ' ' + format;
        this.LaunchPayModal(module, type);
      } else {
        this.LaunchPayModal(module, type);
      }
    });
  }
  //fin change Transaction phone number

  paymentRequest(module, price,date_activation,number){
    this.ngxService.start();
    this.payment.description = "Payment du module standart";
    this.payment.amount = price;
    this.payment.duration = date_activation;
    this.payment.email =  this.user.user.email;
    this.payment.phone = (number.replace(' ',"")).replaceAll('-',"");

    if(this.payment.email == null){}

    if(this.user != null ){
      
      this.profilService.payrequest(this.payment)
      .then(
        (result: any) => {
          if (result === null) {
            this.libraryService.onWarning('Une erreur est survenue', 5000, 'top-end'); return;
          }
          else{

          }
        },
        error => {
          if (error.status === 400) {
            this.libraryService.onError(error._body, 2000, 'top-start'); return;
          } else {
            this.ngxService.stop();
            this.libraryService.onError('Une erreur est survenue lors de la connexion', 2000, 'top-start'); return;
          }
        }
      );   
    }

  }

  saveGroup() {
    this.user = this.locStorService.getUser();
    this.profilService.getGroupRoles(this.user.group)
      .then(
        result => {
          console.log(result)
          this.locStorService.saveGroup(result);
        },
        error => {
          if (error.status === 400) {
            this.libraryService.onError(error._body, 2000, 'top-start'); return;
          } else {
            this.libraryService.onError('Une erreur est survenue lors de la connexion', 2000, 'top-start'); return;
          }
        }
      );
  }

  //create object
  getCurrentStats(): void {
    this.isLoadingStats = true;
    this.statsService.getCurrentStats(this.user)
      .then(
        result => {
          this.isLoadingStats = false;
          this.report = result;
          if (this.report === null) this.report = new GlobalReport();
        },
        (error: any) => {
          this.isLoadingStats = false;
        }
      );
  }//fin getCurrentStats

  //show by period stats
  getStatsByPeriod(form: any): void {
    this.param.startDate = form.dateStart;
    this.param.endDate = form.dateEnd;
    this.isLoadingStats = true;
    this.statsService.getPeriodGlobalStats(this.param)
      .then(
        result => {
          this.isLoadingStats = false;
          this.report = result;
          if (this.report === null) this.report = new GlobalReport();
        },
        (error: any) => {
          this.isLoadingStats = false;
        }
      );
  }//fin getStatsByPeriod

  //get product name
  getProductName(obj: ProductInStock) {
    if (obj !== null && obj !== undefined) {
      if (obj.product !== null && obj.product !== undefined) { return obj.product.product.name; } else { return ""; }
    } else { return ""; }
  }//fin getProdName

  //get list of stock limit
  getUnderStockProdList(): void {
    this.isLoading = true; this.underStockList = [];
    this.stockLimitService.getProdUnderStockLimit(this.user)
      .then(
        underStockList => {
          this.isLoading = false;
          if (underStockList.length === 0) { this.noData = true; } else { this.noData = false; }
          this.underStockList = underStockList;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getUnderStockProdList

  //search list of products stock view
  searchStockView(): void {
    this.isLoading = true; this.underStockList = [];
    let prodObj: any = { product_name: this.parame.product, product_code: this.parame.codebarre, id_profile: 0 };

    this.productService.searchStockView(this.user, prodObj)
      .then(
        underStockList => {
          this.isLoading = false;
          if (underStockList.length === 0) { this.noData = true; } else { this.noData = false; }
          this.underStockList = underStockList;
          console.log(this.underStockList)
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchStockView

  //get list of saletarget list
  getSaleTargetList(): void {
    this.isLoadingOne = true; this.saleTargetList = [];
    this.saletargetService.getSaleTargetList(this.user)
      .then(
        saletargetlist => {
          this.isLoadingOne = false;
          if (saletargetlist.length === 0) { this.noDataOne = true; } else { this.noDataOne = false; }
          this.saleTargetList = saletargetlist;
        },
        error => {
          this.isLoadingOne = false;
        }
      );
  }//fin getSaleTargetList

  //get list of measure types
  getMeasureTypes(): void {
    this.measureTypes = [];
    this.measureTypeService.getMeasureTypes(this.user)
      .then(
        measureTypes => {
          let emptyObj: MeasureType = new MeasureType(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.measureTypes.push(emptyObj);
          if (measureTypes !== null) {
            measureTypes.filter(obj => this.measureTypes.push(obj));
          }
          //this.measureTypes = measureTypes;
        },
        error => {
        }
      );
  }//fin getMeasureTypes

  //get product measure type
  getProductMeasureType(obj: ProductInStock) {
    if (obj !== null && obj !== undefined) {
      if (obj.product !== null && obj.product !== undefined) { return "(" + obj.product.measure_type.name + ")"; } else { return ""; }
    } else { return ""; }
  }//fin getProdMeasureType

  //get product quantity or amount
  getProductQA(obj: ProductInStock) {
    if (obj !== null && obj !== undefined) { return obj.quantity; } else { return 0; }
  }//fin getProdQA

  getSelectedDate1($event: Date) {
    this.param.startDate = $event;
  }

  getSelectedDate2($event: Date) {
    this.param.endDate = $event;
  }

  getPeriodLib(): string {
    let periodLib: string = "du " + this.param.startDate + " au  " + this.param.endDate;
    return periodLib;
  }//fin getPeriodLib


}
