import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/shared/models/profil/profil';
import { StockTransfer } from 'src/app/shared/models/stocktransfer/stocktransfer';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { StockTransferService } from 'src/app/shared/services/stocktransfer/stocktransfer.service';
import * as FileSaver from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-tran-stocks-details',
  templateUrl: './tran-stocks-details.component.html',
  styleUrls: ['./tran-stocks-details.component.scss']
})
export class TranStocksDetailsComponent implements OnInit {

  @Input() item: StockTransfer;
  @Input() subject: string;
  @Output() closed = new EventEmitter<string>(); //used to update the list when action completed here
  isPrinting: boolean = false;
  isTransferPdfVisible: boolean = false; generatedTransferPdf: string = "";

  //user connected
  user: Profil;

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";


  constructor(
    private stockTransferService: StockTransferService,
    private ngxService: NgxUiLoaderService,
    public activeModal: NgbActiveModal,
    private locStorService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.item.agent = this.user;
  }

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //hide the form
  hideForm(): void {
    this.closed.emit("closed");
  }//fin hideForm

  //get author
  getAuthor(obj: Profil): string {
    let result: string = "";
    result = (obj.user !== null) ? (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getAuthor

  //print order
  printData(): void {
    this.ngxService.start();
    this.isPrinting = true;
    this.stockTransferService.printTransfer(this.item)
      .then(
        pdf => {
          this.ngxService.stop();
          this.isPrinting = false;
          let fileBlob = pdf.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          let filename = 'ISHOWO_TRANSFERT_DETAILS.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob); window.open(url, '_blank');

          this.isTransferPdfVisible = true;
          if (pdf != null) this.generatedTransferPdf = pdf.filename;
        },
        error => {
          this.ngxService.stop();
          this.isPrinting = false;
        }
      );
  }//fin printData

  //update on close
  updateOnPdfClose(event: any): void {
    this.isTransferPdfVisible = false;
  }//fin updateOnPdfClose

  close() {
    this.activeModal.close();
  }
}
