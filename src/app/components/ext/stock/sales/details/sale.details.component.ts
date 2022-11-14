
import {Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Sale} from "../../../../models/sale/sale";
import {User} from "../../../../models/user/user";
import {SaleService} from "../../../../services/sale/sale.service";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'it-sale-details',
  templateUrl: './sale.details.component.html',
  //styleUrls: ['./orders.component.css']

})

export class SaleDetailsComponent implements OnInit, OnChanges{

  @Input() item: Sale;
  @Input() subject: string;
  @Output() closed = new EventEmitter<string>(); //used to update the list when action completed here
  isPrinting: boolean = false;
  isVentePdfVisible: boolean = false;  generatedVentePdf: string = "";
  amountToPay: number = 0;

  //user connected
  user: Profil;

  //form related objects
  isBalancing: boolean = false;

  constructor(
    private saleService: SaleService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.item.agent = this.user;
    this.amountToPay = this.item.amount_real - this.item.amount_received;
  }

  ngOnChanges(): void{
    // if(this.item.customer === null || this.item.customer === undefined){this.item.customer = new User(); }
  }

  //get customer
  getCustomer(obj: User): string{
    let result: string = "";
    result = (obj !== null && obj !== undefined && obj.lastname !== undefined  && obj.firstname !== undefined)?
      (obj.lastname + " " + obj.firstname) : "";
    return result;
  }//fin getCustomer

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //hide the form
  hideForm() : void {
    this.closed.emit("closed");
  }

  //print order
  printData(): void {
    this.isPrinting = true;
    this.saleService.printSale(this.item)
      .then(
        pdf => {
          this.isPrinting = false;

          let fileBlob = pdf.blob();  let blob = new Blob([fileBlob], {   type: 'application/pdf'     });
          let filename = 'ISHOWO_DETAIL_VENTE.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob);  window.open(url,'_blank');

          // this.isVentePdfVisible = true;
          // if(pdf != null)  this.generatedVentePdf = pdf.filename;
        },
        error => {
          this.isPrinting = false;
          alert("Une erreur est survenue");
        }
      );
  }//fin printData

  //update on close
  updateOnPdfClose(event: any): void {
    this.isVentePdfVisible = false;
  }//fin updateOnPdfClose

    //solder
  payBalance(): void{
    this.isBalancing = true;
    this.item.amount_received = this.amountToPay + this.item.amount_received;
    this.saleService.payBalance(this.item)
      .then(
        result => {
          this.amountToPay = 0;
          this.isBalancing = false;
          this.closed.emit("closed");
        },
        error => {
          this.isBalancing = false;
           alert("Une erreur est survenue. Veuillez réessayer");
        }
      );
  }//fin payBalance

  //can show balance button 
  canShowBalanceBtn(): boolean{
    if(this.item === null || this.item === undefined) {return false; }
    if(this.item.amount_received >= this.item.amount_real) {return false; } else {return true; }
  }//fin canShowBalanceBtn

}
