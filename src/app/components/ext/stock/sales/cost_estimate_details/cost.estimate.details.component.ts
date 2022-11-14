
import {Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';


import {Sale} from "../../../../models/sale/sale";
import {User} from "../../../../models/user/user";
import {SaleService} from "../../../../services/sale/sale.service";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";


@Component({
  selector: 'it-cost-estimate-details',
  templateUrl: './cost.estimate.details.component.html',
  //styleUrls: ['./orders.component.css']

})

export class CostEstimateDetailsComponent implements OnInit, OnChanges{

  @Input() item: Sale;
  @Input() subject: string;
  @Output() closed = new EventEmitter<string>(); //used to update the list when action completed here
  isPrinting: boolean = false;
  isVentePdfVisible: boolean = false;  generatedVentePdf: string = "";

  //user connected
  user: Profil;

  constructor(
    private saleService: SaleService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.item.agent = this.user;
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
    this.saleService.printDevis(this.item)
      .then(
        pdf => {
          this.isPrinting = false;
          this.isVentePdfVisible = true;
          if(pdf != null)  this.generatedVentePdf = pdf.filename;
        },
        error => {
          this.isPrinting = false;
        }
      );
  }//fin printData

  //update on close
  updateOnPdfClose(event: any): void {
    this.isVentePdfVisible = false;
  }//fin updateOnPdfClose

}
