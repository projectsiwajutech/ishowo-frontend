import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { ProductParam } from 'src/app/shared/models/query/ProductParam';
import { StockTransfer } from 'src/app/shared/models/stocktransfer/stocktransfer';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';
import { StockTransferService } from 'src/app/shared/services/stocktransfer/stocktransfer.service';
import { TranStocksCreateComponent } from '../create/tran-stocks-create.component';
import * as FileSaver from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranStocksDetailsComponent } from '../details/tran-stocks-details.component';

@Component({
  selector: 'app-tran-stocks-list',
  templateUrl: './tran-stocks-list.component.html',
  styleUrls: ['./tran-stocks-list.component.scss']
})
export class TranStocksListComponent implements OnInit {

  stockTransfers: StockTransfer[] = [];
  selectedUpObject: StockTransfer;
  selectedDelObject: StockTransfer;
  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();

  isListVisible: boolean = true; noData: boolean; page: number = 1; pageSize: number = 30;
  isLoading: boolean = false; isPrinting: boolean = false;
  isTransfersListPdfVisible: boolean = false; generatedTransfersListPdf: string = "";
  param: PeriodParam = new PeriodParam();
  pageStartIndex: number = 0; limitTable: number[] = []; pageLimit: number = 0;

  //filter variables
  filterParam: ProductParam = new ProductParam();
  compartments: Compartment[];

  //user connected
  user: Profil;

  constructor(
    private stockTransferService: StockTransferService,
    private compartmentService: CompartmentService,
    private ngxService: NgxUiLoaderService,
    private locStorService: LocalStorageService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getStockTransferList();
    this.getCompartments();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of stock limit
  getStockTransferList(): void {
    this.isLoading = true; this.stockTransfers = [];
    this.stockTransferService.getTransferList(this.user)
      .then(
        stockTransfers => {
          this.isLoading = false;
          if (stockTransfers.length === 0) { this.noData = true; } else { this.noData = false; }
          this.stockTransfers = stockTransfers;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getStockTransferList

  //get list of orders
  searchData(form: any): void {
    this.isLoading = true; this.stockTransfers = [];
    this.param.startDate = form.dateStart;
    this.param.endDate = form.dateEnd;
    this.stockTransferService.searchTransfers(this.param)
      .then(
        stockTransfers => {
          this.isLoading = false;
            if (stockTransfers.length === 0) { this.noData = true; } else { this.noData = false; }
            this.stockTransfers = stockTransfers;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchData


  //print list of sales
  printData(): void {
    this.ngxService.start();
    this.isPrinting = true;
    this.stockTransferService.printTransfers(this.param)
      .then(
        pdf => {
          this.isPrinting = false;

          let fileBlob = pdf.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          let filename = 'ISHOWO_LISTE_COMMANDES.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob);
          this.ngxService.stop();
          window.open(url, '_blank');
        },
        error => {
          this.isPrinting = false;
          this.ngxService.stop();
        }
      );
  }//fin printData

  //get author
  getAuthor(obj: Profil): string {
    let result: string = "";
    result = (obj.user !== null) ? (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getAuthor

  //select for update
  viewDetails(obj: StockTransfer): void {
    this.selectedUpObject = obj;
    const modalRef = this.modalService.open(TranStocksDetailsComponent, { size: 'xl' });
    modalRef.componentInstance.item = obj;
  }//fin selectForUpdate

  //select for update
  selectForUpdate(obj: StockTransfer): void {
    this.selectedUpObject = obj;
  }//fin selectForUpdate

  getSelectedDate1($event: Date) {
    this.param.startDate = $event;
  }

  getSelectedDate2($event: Date) {
    this.param.endDate = $event;
  }

  //get list of compartments
  getCompartments(): void {
    this.compartments = [];
    this.compartmentService.getCompartments(this.user)
      .then(
        compartments => {
          let emptyObj: Compartment = new Compartment(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.compartments.push(emptyObj);
          compartments.filter(obj => this.compartments.push(obj));
          //this.compartments = compartments;
        },
        error => {
        }
      );
  }//fin getCompartments


  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(TranStocksCreateComponent,  { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  //paginate on page change
  paginate(event: any): void {
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

}
