import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Category } from 'src/app/shared/models/category/category';
import { Customer } from 'src/app/shared/models/customer/customer';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ProductParam } from 'src/app/shared/models/query/ProductParam';
import { Sale } from 'src/app/shared/models/sale/sale';
import { ProductSaleAddPipe } from 'src/app/shared/pipes/domain_specific/product_sale_add.pipe';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import * as FileSaver from 'file-saver';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { SaleService } from 'src/app/shared/services/sale/sale.service';
import { NewCustomerComponent } from '../create/new-customer/new-customer.component';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { ProductLine } from 'src/app/shared/models/product/productLine';

@Component({
  selector: 'app-partial-sale-create',
  templateUrl: './partial-sale-create.component.html',
  styleUrls: ['./partial-sale-create.component.scss']
})
export class PartialSaleCreateComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() subject: string;
  item: Sale;
  lastSale: Response;
  productSearchName: string;
  productSearchBarCode: string;
  pdfTitle: string = "Facture";
  lineSize: number = 0;
  numPadAmount;
  Defremise = 0;
  typeRemise = "pourcentage";
  typeRemise1 = "pourcentage";
  typeRemise2 = "montant";
  Deftva = 0;
  prodSaleAdd: ProductSaleAddPipe = new ProductSaleAddPipe();
  stock_view: ProductInStock[] = [];

  quantity: number = 0; selling_price: number = 0; reliquat: number = 0; restToPaid: number = 0;
  NAP: number; REMISE: number; TVA: number; LineTVA: number; LineRemise: number;

  //form related objects
  visible: boolean = false;
  setGroup: string; setAIB: string;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = ""; isPrinting: boolean; isLoading: boolean;
  isInvoiceVisible: boolean = false; generatedInvoice: string = "";
  isLoadingStock: boolean = false; display: boolean = false;

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  //customer
  CustomerSelected: boolean;
  customer: Customer;

  //devis
  is_checked: boolean = false;

  //filter variables
  param: ProductParam = new ProductParam();
  categories: Category[];
  countProdFinded: number;
  @ViewChildren('productsList') listItems;

  constructor(
    private saleService: SaleService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private constantService: ConstantService,
    private ngxService: NgxUiLoaderService,
    private sanitizer: DomSanitizer
  ) { }

  //ngOnInit
  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param = new ProductParam();
    this.getStockView();
    this.getCategories();
    this.getParamsMecef();
    this.item = new Sale();
  }//end ngOnInit

  //ngOnChanges
  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
    this.param = new ProductParam();
    this.getStockView();
    this.item = new Sale();

  }//end ngOnChanges

  ngAfterViewInit() {
    this.onLoadFocus();
  }
  //focus
  onLoadFocus() {
    document.getElementById("code_barre").focus();
  }
  //fin focus

  //test de limitation
  inputValidator(event: any) {
    const pattern = /[0-9]/;
    let montant_reçu = JSON.stringify(this.numPadAmount)

    if ((!pattern.test(event.target.value)) || (montant_reçu.length > 7)) {
      this.ResetNumPad();
    }
  }
  //fin test de limitation

  //add product line
  addProductLine(obj: ProductInStock): void {
    //check if undefined
    if (this.item.lines === undefined || this.item.lines === null) { this.item.lines = []; }

    //add 1 automatically for ease of use
    if (obj.quantity_sell === 0) { obj.quantity_sell = 1; }

    //check if already added
    let searchProdList: ProductLine[] = this.item.lines.filter(x => x.id === obj.id);
    if (searchProdList.length !== 0) {
      let searchProdIndex = this.item.lines.indexOf(searchProdList[0]);

      //check qty
      if (this.item.lines[searchProdIndex].quantite >= obj.quantity) {
        this.libraryService.onWarning('Quantité en stock atteinte!', 1000, 'top-end');
        return;
      }

      this.item.lines[searchProdIndex].quantite = this.item.lines[searchProdIndex].quantite + obj.quantity_sell;
      this.updateTax(this.item.lines[searchProdIndex].id, this.item.lines[searchProdIndex].tax);
      this.lineSize = this.item.lines.length;
    } else {
      let newLine = new ProductLine();
      newLine.id = obj.id;
      newLine.product = obj.product;
      newLine.compartment = obj.compartment;
      newLine.p_achat = obj.purchase_price;
      newLine.p_vente = obj.selling_price;
      newLine.quantite = obj.quantity_sell;
      newLine.ts = 0;
      newLine.libellets = "";
      newLine.tax = this.setGroup,
        newLine.prod = obj;
      let copiedPStock: ProductLine = this.libraryService.copy(newLine);
      this.item.lines.push(copiedPStock);
      this.updateTax(copiedPStock.id, copiedPStock.tax);
      this.lineSize = this.item.lines.length;

    }

  }//fin addProductLine
  //remove product line
  removeProductLine(index: number): void {
    this.item.lines.splice(index, 1);
    this.lineSize = this.item.lines.length;
  }//fin removeProductLine

  //get Net à Payer
  getNap(form: any) {
    if (this.item === undefined || this.item === null) { return 0; }
    if (this.item.lines === undefined || this.item.lines === null) { return 0; }
    if (this.item.lines.length === 0) { return 0; }

    let total: number = 0;
    total = this.item.lines
      .map(p => (p.quantite * p.p_vente) + p.mt_tva)
      .reduce((sum, current) => sum + current);

    if (form.type_remise === "montant") {
      let remise = form.remise;
      this.LineRemise = (remise * 100) / this.getTotal();
      this.LineTVA = form.tva;
      this.REMISE = (this.getTotal() * this.LineRemise) / 100;
      let Mt_Remise = total - (total * this.LineRemise) / 100;
      // let Mt_Tva = (Mt_Remise * this.LineTVA) / 100;
      // this.TVA = Mt_Tva;
      // this.NAP = Mt_Remise + Mt_Tva;
      this.NAP = Mt_Remise;
    }
    else if (form.type_remise === "pourcentage") {
      this.LineRemise = form.remise;
      this.LineTVA = form.tva;
      this.REMISE = (this.getTotal() * this.LineRemise) / 100;
      let Mt_Remise = total - (total * this.LineRemise) / 100;
      // let Mt_Tva = (Mt_Remise * this.LineTVA) / 100;
      // this.TVA = Mt_Tva;
      // this.NAP = Mt_Remise + Mt_Tva;
      this.NAP = Mt_Remise;
    }
    let aib;
    switch (this.setAIB) {
      case "0%":
        this.item.taux_aib = 0;
        this.item.amount_aib = 0;
        return this.NAP;
      case "1%":
        aib = (this.getTotal() * 1) / 100;
        this.item.taux_aib = 1;
        this.item.amount_aib = aib;
        this.NAP = this.NAP + aib;
        return this.NAP;
        break;
      case "5%":
        aib = (this.getTotal() * 5) / 100;
        this.item.taux_aib = 5;
        this.item.amount_aib = aib;
        this.NAP = this.NAP + aib;
        return this.NAP;
        break;

      default:
        break;
    }
  }//fin get Net à Payer


  // get Reliquat
  getReliquat() {
    let total = this.NAP;
    let calc = this.numPadAmount - total;

    if (calc > 0) {
      this.reliquat = calc;
    } else {
      this.reliquat = 0;
    }
    return this.reliquat;
  }//fin get Reliquat

  //get Total TVA
  getTVA() {
    if (this.item === undefined || this.item === null) { return 0; }
    if (this.item.lines === undefined || this.item.lines === null) { return 0; }
    if (this.item.lines.length === 0) { return 0; }

    let totalTVA: number = 0;
    totalTVA = this.item.lines
      .map(p => p.mt_tva)
      .reduce((sum, current) => sum + current);
    return totalTVA;
  }
  //fin get Total TVA

  // get RestToPaid
  getRestToPaid() {
    let total = this.NAP;
    let calc = this.numPadAmount - total;
    if (calc < 0) {
      this.restToPaid = -(calc);
    } else {
      this.restToPaid = 0;
    }
    return this.restToPaid;
  }//fin get RestToPaid


  //get total
  getTotal(): number {
    if (this.item === undefined || this.item === null) { return 0; }
    if (this.item.lines === undefined || this.item.lines === null) { return 0; }
    if (this.item.lines.length === 0) { return 0; }

    let total: number = 0;
    total = this.item.lines
      .map(p => p.quantite * p.p_vente)
      .reduce((sum, current) => sum + current);
    return total;

  }//fin getTotal

  //create object
  saveSale() {
    //conditions reunies ou non
    if ((this.item.lines === null || this.item.lines === undefined || this.item.lines.length === 0)) {
      this.libraryService.onWarning('Veuillez ajouter un Produit!', 1100, 'top-end'); return;
    } else if (this.numPadAmount === undefined) {
      this.libraryService.onWarning('veuillez renseignez le Montant reçu!', 1100, 'top-end'); return;
    } else if (this.locStorService.readFromSession('Customer') === null) {
      this.libraryService.onWarning('veuillez renseignez le Client!', 1100, 'top-end'); return;
    } else if (this.getRestToPaid() == 0) {
      this.libraryService.onWarning('Le montant saisi n\'est pas conforme à la vente à crédit!', 1300, 'top-end'); return;
    }

    this.ngxService.start();
    this.pdfTitle = "Facture";

    //Sale
    this.item.id = 0;
    this.item.date = new Date();
    this.item.is_balanced = false;
    this.item.amount_original = this.getTotal();;
    this.item.amount_remise = this.REMISE;
    this.item.amount_tva = this.getTVA();
    this.item.amount_paid = JSON.parse(this.numPadAmount);
    this.item.amount_to_pay = this.NAP;
    this.item.remainder = this.getReliquat();
    this.item.rest_to_pay = this.getRestToPaid();
    this.item.agent = this.user;
    this.item.with_invoice = null;
    this.item.reference = "";

    //update product amount_tva
    this.item.lines.forEach(element => {
      this.updateTax(element.id, element.tax)
    });

    //customer
    if (this.locStorService.readFromSession('Customer') === null) {
      this.item.customer = new Customer();
    } else {
      this.item.customer = this.locStorService.readFromSession('Customer');
      this.customer.solde = this.customer.solde + this.getRestToPaid();
      this.customerService.updateCustomer(this.customer)
    }

    //statut indicators
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.generatedInvoice = ""; this.isInvoiceVisible = false;

    this.saleService.createSale(this.item)
      .then(
        result => {
          this.giveUpSale();
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;
          this.getStockView();
          this.ngxService.stop();
          let fileBlob = result.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          let filename = 'ISHOWO_TICKET_CAISSE.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob);
          this.libraryService.onSuccess('Vente Enregistrée avec Succès!', 2500, 'top-end');
          window.open(url, '_blank');
          this.locStorService.saveToSession("lastSale", url)
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.ngxService.stop();
          this.libraryService.onSuccess('Vente Enregistrée avec Succès!', 2000, 'top-end');
          this.libraryService.onError('Echec de la normalisation!', 3000, 'top-start'); return;
        }
      );
  }//end saveSale


  //create object
  saveDevis() {
    //conditions reunies ou non
    if ((this.item.lines === null || this.item.lines === undefined || this.item.lines.length === 0)) {
      this.libraryService.onWarning('Veuillez ajouter un Produit!', 1100, 'top-end'); return;
    } else if (this.locStorService.readFromSession('Customer') === null) {
      this.libraryService.onWarning('veuillez renseignez le Client!', 1100, 'top-end'); return;
    }

    this.ngxService.start();
    this.pdfTitle = "Devis";
    //checks
    if (this.item.lines === undefined || this.item.lines === null) { this.item.lines = []; }
    if (this.item.lines.length === 0) { this.libraryService.showMessage("Veuillez aujouter des produits à cette commande"); return; }

    //Devis
    this.item.id = 0;
    this.item.date = new Date();
    this.item.is_balanced = false;
    this.item.amount_original = this.getTotal();
    this.item.amount_remise = this.REMISE;
    this.item.amount_tva = this.getTVA();
    this.item.amount_paid = 0;
    this.item.amount_to_pay = this.NAP;
    this.item.remainder = this.getReliquat();
    this.item.rest_to_pay = this.getRestToPaid();
    this.item.agent = this.user;
    this.item.customer = this.locStorService.readFromSession('Customer');
    this.item.with_invoice = null;
    this.item.reference = "";
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.generatedInvoice = ""; this.isInvoiceVisible = false;

    //update product amount_tva
    this.item.lines.forEach(element => {
      this.updateTax(element.id, element.tax)
    });

    this.saleService.createDevis(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;
          this.ngxService.stop();
          this.item = new Sale();
          this.lineSize = 0;
          this.deleteCustomer();
          this.Defremise = 0;
          this.Deftva = 0;
          this.statusMessage = "Devis créé avec succès";
          this.created.emit("created");
          this.getStockView();

          let fileBlob = result.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          let filename = 'ISHOWO_DEVIS.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob);
          this.libraryService.onSuccess('Devis Enregistrée avec Succès!', 2500, 'top-end');
          window.open(url, '_blank');
          this.locStorService.saveToSession("lastSale", url)
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.ngxService.stop();
          this.statusMessage = this.libraryService.getServiceErrorText(error);
        }
      );
  }//end saveDevis

  //get list of products stock view
  getStockView(): void {
    this.stock_view = []; this.isLoadingStock = true;
    this.productService.getStockViewForSale(this.user)
      .then(
        stock_view => {
          this.stock_view = stock_view; this.isLoadingStock = false;
        },
        error => { this.isLoadingStock = false; }
      );
  }//fin getStockView

  //get list of categories
  getCategories(): void {
    this.categories = [];
    this.categoryService.getCategories(this.user)
      .then(
        categories => {
          let emptyObj: Category = new Category(); emptyObj.id = 0; emptyObj.name = "Toutes";
          this.categories.push(emptyObj);

          if (categories !== null) {
            categories.filter(obj => this.categories.push(obj));
          }
        },
        error => {
        }
      );
  }//fin getCategories

  //liste les ventes
  listSale(): void {
    let link = ['/app/sales_list'];
    this.router.navigate(link);
  }//fin listSale

  //add breakOrNot
  addBreakOrNot(itemName: string) {
    if (itemName.length < 14 || itemName.length < 14) {
      return true;
    }
    else { return false; }
  }//fin add breakOrNot


  //change Product Tax
  changeTax(id: number, tax: any) {

    let searchProdList: ProductLine[] = this.item.lines.filter(x => x.id === id);
    let searchProdIndex = this.item.lines.indexOf(searchProdList[0]);
    let Original_Price = this.item.lines[searchProdIndex].p_vente * this.item.lines[searchProdIndex].quantite;
    this.item.amount_remise = this.REMISE;
    switch (tax) {
      case undefined:
        this.item.lines[searchProdIndex].tax = "E";
        if (this.item.amount_remise > 0) {
          this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
        } else {
          this.item.lines[searchProdIndex].mt_remise = 0;
        }
        this.item.lines[searchProdIndex].mt_tva = 0;
        break;

      case "E":
        this.item.lines[searchProdIndex].tax = "B";
        let HT;
        if (this.item.amount_remise > 0) {
          this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
        } else {
          this.item.lines[searchProdIndex].mt_remise = 0;
        }
        HT = (Original_Price - this.item.lines[searchProdIndex].mt_remise)
        this.item.lines[searchProdIndex].mt_tva = (HT * 18) / 100;

        break;

      case "B":
        this.item.lines[searchProdIndex].tax = "A";
        if (this.item.amount_remise > 0) {
          this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
        } else {
          this.item.lines[searchProdIndex].mt_remise = 0;
        }
        this.item.lines[searchProdIndex].mt_tva = 0;
        break;

      default:
        this.item.lines[searchProdIndex].tax = "E";
        if (this.item.amount_remise > 0) {
          this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
        } else {
          this.item.lines[searchProdIndex].mt_remise = 0;
        }
        this.item.lines[searchProdIndex].mt_tva = 0;
        break;
    }
  }
  //end change Product Tax

  updateAllProducts() {
    this.item.lines.forEach(element => {
      this.updateTax(element.id, element.tax);
    });
  }

  //update Product Tax
  updateTax(id: number, tax: any) {
    let searchProdList: ProductLine[] = this.item.lines.filter(x => x.id === id);
    let searchProdIndex = this.item.lines.indexOf(searchProdList[0]);
    let Original_Price = this.item.lines[searchProdIndex].p_vente * this.item.lines[searchProdIndex].quantite;
    this.item.amount_remise = this.REMISE;
    switch (tax) {
      case "A":
        if (this.item.amount_remise > 0) {
          this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
        } else {
          this.item.lines[searchProdIndex].mt_remise = 0;
        }
        this.item.lines[searchProdIndex].mt_tva = 0;
        break;

      case "B":
        let HT;
        if (this.item.amount_remise > 0) {
          this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
        } else {
          this.item.lines[searchProdIndex].mt_remise = 0;
        }
        HT = (Original_Price - this.item.lines[searchProdIndex].mt_remise)
        this.item.lines[searchProdIndex].mt_tva = (HT * 18) / 100;
        break;

      case "E":
        if (this.item.amount_remise > 0) {
          this.item.lines[searchProdIndex].mt_remise = (Original_Price * this.LineRemise) / 100;
        } else {
          this.item.lines[searchProdIndex].mt_remise = 0;
        }
        this.item.lines[searchProdIndex].mt_tva = 0;
        break;

      default:
        break;
    }
  }
  //end update Product Tax

  //Incrementation de la quantité
  IncrementQuantity(obj: ProductInStock) {
    //check if undefined

    if (this.item.lines === undefined || this.item.lines === null) { this.item.lines = []; }

    //add 1 automatically for ease of use
    if (obj.quantity_sell === 0) { obj.quantity_sell = 1; }

    //check if already added
    let searchProdList: ProductLine[] = this.item.lines.filter(x => x.id === obj.id);
    if (searchProdList.length !== 0) {
      let searchProdIndex = this.item.lines.indexOf(searchProdList[0]);

      //check qty
      if (this.item.lines[searchProdIndex].quantite >= obj.quantity) {
        this.libraryService.onWarning('Quantité en stock atteinte!', 1000, 'top-end');
        return;
      }

      this.item.lines[searchProdIndex].quantite = this.item.lines[searchProdIndex].quantite + obj.quantity_sell;
      this.updateTax(this.item.lines[searchProdIndex].id, this.item.lines[searchProdIndex].tax)
      this.lineSize = this.item.lines.length;
    }

  }//Incrémentation de la quantité

  //Décrémentation de la quantité
  DecrementQuantity(obj: ProductLine, quantity: any) {
    //check if already added
    if (quantity == 1) {
      this.libraryService.onWarning('La quantité minimum est 1', 1000, 'top-end');
      return;
    }
    let searchProdList: ProductLine = this.item.lines.filter(x => x.id === obj.id)[0];
    let searchProdIndex = this.item.lines.indexOf(searchProdList);
    //check qty
    this.item.lines[searchProdIndex].quantite = this.item.lines[searchProdIndex].quantite - 1;
    this.updateTax(this.item.lines[searchProdIndex].id, this.item.lines[searchProdIndex].tax)
  }//fin Décrémentation de la quantité

  //Check de la quantité
  CheckQuantity(obj: ProductLine, quantity: any) {
    //check if already added
    let searchProdList: ProductLine = this.item.lines.filter(x => x.id == obj.id)[0];
    let searchProdIndex = this.item.lines.indexOf(searchProdList);
    //check qty
    if (quantity > obj.prod.quantity) {
      this.item.lines[searchProdIndex].quantite = 1;
      this.libraryService.onWarning('Quantité en stock atteinte!', 1100, 'top-end');
      return;
    } else { }

    if (quantity == 0) {
      this.item.lines[searchProdIndex].quantite = 1;
      this.libraryService.onWarning('La quantité minimum est 1', 1100, 'top-end');
      return;
    }
  }//fin Check de la quantité

  //add new customer
  AddNewCustomer(): void {
    const modalRef = this.modalService.open(NewCustomerComponent, this.constantService.ModalOptionsOne);
  }//fin add new customer

  // Reset NumPad
  ResetNumPad() {
    this.numPadAmount = null;
  }//fin Reset NumPad

  //add NumPadAdd
  NumPadAdd(num: string) {
    let inputVal = (<HTMLInputElement>document.getElementById("numPadAmount")).value;
    let concat = inputVal + num;
    let concatLength = JSON.stringify(concat);
    if (concatLength.length > 9) { this.ResetNumPad(); }
    else {
      this.numPadAmount = concat;
    }
  }//fin NumPadAdd

  //add NumPadAdd
  RemoveOnPad() {
    let inputVal = (<HTMLInputElement>document.getElementById("numPadAmount")).value;
    let CkeckVal = JSON.parse(inputVal);
    if (CkeckVal < 10) {
      this.numPadAmount = null;
    } else {
      let inputOnString = JSON.stringify(inputVal);
      let sliceNum = inputOnString.substring(0, inputOnString.length - 2);
      sliceNum = sliceNum.replace('"', '');
      sliceNum = JSON.parse(sliceNum);
      this.numPadAmount = sliceNum;
    }
  }//fin NumPadAdd

  //check If Customer Exist
  checkIfCustomerExist() {
    let selectedCustomer = this.locStorService.readFromSession('Customer');
    if (selectedCustomer === null) {
      return false
    } else {
      return true;
    }
  }
  //fin check If Customer Exist

  //delete Customer
  deleteCustomer() {
    localStorage.removeItem('Customer');
  }
  //fin delete Customer

  //get paramsMecef
  getParamsMecef(): void {
    this.saleService.getParamsMecef(this.user)
      .then(
        paramsMecef => {
          let setGroup = paramsMecef.filter(param => param.key === "DEF_TAX")[0];
          let setAIB = paramsMecef.filter(param => param.key === "AIB")[0];
          this.setGroup = setGroup.value;
          this.setAIB = setAIB.value;
        },
        error => {
        }
      );
  }//fin paramsMecef

  //give up Sale
  giveUpSale() {
    localStorage.removeItem('Customer');
    this.item = new Sale();
    this.lineSize = 0;
    this.ResetNumPad();
    this.Defremise = 0;
    this.Deftva = 0;
  }
  //fin delete Customer

  // get selected Customer
  getSelectedCustomer() {
    let selectedCustomer = this.locStorService.readFromSession('Customer');
    if (selectedCustomer === null) {
      this.CustomerSelected = false;
    } else {
      this.CustomerSelected = true;
      this.customer = selectedCustomer;
      let customerInfo = this.customer.nom + ' ' + this.customer.prenom;
      return customerInfo;
    }

  }//fin get selected Customer

  //reset filter form
  resetFilterForm() {
    this.param = new ProductParam();
  }
  //fi reset form

  //printData of Last sale
  printData(): void {
    this.isPrinting = true; this.pdfTitle = "Facture";
    let lastSale = this.locStorService.readFromSession('lastSale');

    if (lastSale !== null) {
      window.open(lastSale, '_blank');
    }
  }//fin printData

  // OnchangeStatut of Devis Switch
  OnchangeStatut($event) {
    this.ResetNumPad();
    this.is_checked = $event.target.checked;
  } //fin OnchangeStatut of Devis Switch

  //confirmProdRemoveModal
  async confirmProdRemoveModal(item: ProductInStock, itemIndex: number) {
    await Swal.fire({
      customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-danger' },
      text: `Êtes-vous sûre de retirer le produit : ${item.product.product.name}`,
      icon: 'warning',
      imageHeight: 100,
      imageWidth: 100,
      showCancelButton: true,
      cancelButtonText: `Annuler`,
      confirmButtonText: `Oui je Retire`,
      reverseButtons: true,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeProductLine(itemIndex);
        this.libraryService.onSuccess('Produit retiré', 1200, 'top-end');
      }
    });
  }
}//fin confirmProdRemoveModal
