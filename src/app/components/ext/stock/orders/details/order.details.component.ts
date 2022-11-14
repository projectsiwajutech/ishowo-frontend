

import {Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Order} from '../../../../models/order/order';
import {OrderService} from '../../../../services/order/order.service';
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {Profil} from "../../../../models/profil/profil";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'it-order-details',
  templateUrl: './order.details.component.html',
  //styleUrls: ['./orders.component.css']

})

export class OrderDetailsComponent implements OnInit{

  @Input() item: Order;
  @Input() subject: string;
  @Output() closed = new EventEmitter<string>(); //used to update the list when action completed here
  isPrinting: boolean = false;
  isOrderPdfVisible: boolean = false;  generatedOrderPdf: string = "";
  amountToPay: number = 0;

   //form related objects
  isBalancing: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private orderService: OrderService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.item.agent = this.user;
    this.amountToPay = this.item.amount - this.item.amount_paid;
  }

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
    this.orderService.printOrder(this.item)
      .then(
        pdf => {
          this.isPrinting = false;
          let fileBlob = pdf.blob();  let blob = new Blob([fileBlob], {   type: 'application/pdf'     });
          let filename = 'ISHOWO_DETAIL_COMMANDE.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob);  window.open(url,'_blank')
          
          // this.isOrderPdfVisible = true;
          // if(pdf != null)  this.generatedOrderPdf = filename; // pdf.filename;
        },
        error => {
          this.isPrinting = false;
          alert("Une erreur est survenue");
        }
      );
  }//fin printData

  //solder
  payBalance(): void{
    this.isBalancing = true;
    this.item.amount_paid = this.amountToPay + this.item.amount_paid;
    this.orderService.payBalance(this.item)
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
    if(this.item.amount_paid >= this.item.amount) {return false; } else {return true; }
  }//fin canShowBalanceBtn

  //update on close
  updateOnPdfClose(event: any): void {
    this.isOrderPdfVisible = false;
  }//fin updateOnPdfClose


}
