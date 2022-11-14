

import {Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Profil} from "../../../../models/profil/profil";
import {ProductInStock} from "../../../../models/product/productinstock";
import {ProductService} from "../../../../services/product/product.service";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {StockTransfer} from "../../../../models/stocktransfer/stocktransfer";
import {StockTransferService} from "../../../../services/stocktransfer/stocktransfer.service";


@Component({
  selector: 'it-stock-transfer-details',
  templateUrl: './stock.transfer.details.component.html',
  //styleUrls: ['./orders.component.css']

})

export class StockTransferDetailsComponent implements OnInit{

  @Input() item: StockTransfer;
  @Input() subject: string;
  @Output() closed = new EventEmitter<string>(); //used to update the list when action completed here
  isPrinting: boolean = false;
  isTransferPdfVisible: boolean = false;  generatedTransferPdf: string = "";

  //user connected
  user: Profil;

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";


  constructor(
    private stockTransferService: StockTransferService,
    private locStorService: LocalStorageService,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.item.agent = this.user;
  }

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //hide the form
  hideForm() : void {
    this.closed.emit("closed");
  }//fin hideForm

  //get author
  getAuthor(obj: Profil): string{
    let result: string = "";
    result = (obj.user !== null)? (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getAuthor

  //print order
  printData(): void {
    this.isPrinting = true;
    this.stockTransferService.printTransfer(this.item)
      .then(
        pdf => {
          this.isPrinting = false;
          this.isTransferPdfVisible = true;
          if(pdf != null)  this.generatedTransferPdf = pdf.filename;
        },
        error => {
          this.isPrinting = false;
        }
      );
  }//fin printData

  //update on close
  updateOnPdfClose(event: any): void {
    this.isTransferPdfVisible = false;
  }//fin updateOnPdfClose


}
