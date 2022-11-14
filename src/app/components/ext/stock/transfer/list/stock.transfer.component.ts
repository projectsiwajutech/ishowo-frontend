/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router}   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {StockLimit} from "../../../../models/stocklimit/stocklimit";
import {StockLimitService} from "../../../../services/stocklimit/stocklimit.service";
import {StockTransferService} from "../../../../services/stocktransfer/stocktransfer.service";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {PeriodParam} from "../../../../models/query/PeriodParam";
import {StockTransfer} from "../../../../models/stocktransfer/stocktransfer";
import {Compartment} from "../../../../models/compartment/compartment";
import {ProductParam} from "../../../../models/query/ProductParam";
import {CompartmentService} from "../../../../services/compartment/compartment.service";
import {LibraryService} from "../../../../services/app/library.service";

@Component({
  selector: 'it-stock-transfer',
  templateUrl: './stock.transfer.component.html',
  styleUrls: ['./stock.transfer.component.css']

})

export class StockTransferComponent implements OnInit{

  stockTransfers : StockTransfer[] = [] ;
  selectedUpObject: StockTransfer;
  selectedDelObject: StockTransfer;

  isListVisible: boolean = true;
  isLoading: boolean = false;  isPrinting: boolean = false;
  isTransfersListPdfVisible: boolean = false;  generatedTransfersListPdf: string = "";
  param: PeriodParam = new PeriodParam();
  pageStartIndex : number = 0;  limitTable: number[] = []; pageLimit: number = 0;

  //filter variables
  filterParam: ProductParam = new ProductParam();
  compartments: Compartment[];

  //user connected
  user: Profil;

  constructor(
    private stockTransferService: StockTransferService,
  private compartmentService: CompartmentService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location,
    private libraryService: LibraryService,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getStockTransferList();
    this.getCompartments();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of stock limit
  getStockTransferList(): void {
    this.isLoading = true;  this.stockTransfers = [];
    this.stockTransferService.getTransferList(this.user)
      .then(
        stockTransfers => {
        this.isLoading = false;
        this.stockTransfers = stockTransfers;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getStockTransferList

  //get list of orders
  searchData(): void {
    this.isLoading = true;  this.stockTransfers = [];
    this.stockTransferService.searchTransfers(this.param)
      .then(
        stockTransfers => {
          this.isLoading = false;
          this.stockTransfers = stockTransfers;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchData

  //print list of sales
  printData(): void {
    this.isPrinting = true;
    this.stockTransferService.printTransfers(this.param)
      .then(
        pdf => {
          this.isPrinting = false;
          this.isTransfersListPdfVisible = true;
          if(pdf != null)  this.generatedTransfersListPdf = pdf.filename;
        },
        error => {
          this.isPrinting = false;
        }
      );
  }//fin printData

  //update on close
  updateOnPdfClose(event: any): void {
    this.isTransfersListPdfVisible = event;
  }//fin updateOnPdfClose

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.isListVisible = true;
    this.getStockTransferList();
  }//fin updateOnCreate

  //update list on creation
  updateOnClose(event: any) : void {
    this.selectedUpObject = null;
    this.isListVisible = true;
    this.getStockTransferList();
  }//fin updateOnClose

  //update on visibility change
  updateOnVisibilityChange(event: any): void{
    this.isListVisible = !event;
  }

  //get author
  getAuthor(obj: Profil): string{
    let result: string = "";
    result = (obj.user !== null)? (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getAuthor

  //select for update
  viewDetails(obj: StockTransfer): void{
    this.selectedUpObject = obj;
    this.isListVisible = false;
  }//fin selectForUpdate

  //select for update
  selectForUpdate(obj: StockTransfer): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  getSelectedDate1($event: Date){
    this.param.startDate = $event;
  }

  getSelectedDate2($event: Date){
    this.param.endDate = $event;
  }

  //get list of compartments
  getCompartments(): void {
    this.compartments = [];
    this.compartmentService.getCompartments(this.user)
      .then(
        compartments => {
          let emptyObj : Compartment =  new Compartment(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.compartments.push(emptyObj);
          compartments.filter(obj => this.compartments.push(obj));
          //this.compartments = compartments;
        },
        error => {
        }
      );
  }//fin getCompartments



  goBack(): void {
    this.location.back();
  }

  //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

}
