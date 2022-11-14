/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {StockLimit} from "../../../../models/stocklimit/stocklimit";
import {StockLimitService} from "../../../../services/stocklimit/stocklimit.service";
import {ProductParam} from "../../../../models/query/ProductParam";
import {MeasureType} from "../../../../models/measuretype/measuretype";
import {MeasureTypeService} from "../../../../services/measuretype/measuretype.service";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {Profil} from "../../../../models/profil/profil";
import {ProductInStock} from "../../../../models/product/productinstock";
import {ProdMeasureType} from "../../../../models/prodmeasuretype/prodmeasuretype";

@Component({
  selector: 'it-stock-limit',
  templateUrl: './stock.limit.component.html',
  styleUrls: ['./stock.limit.component.css']

})

export class StockLimitComponent implements OnInit{

  stockLimit : ProdMeasureType[] = [] ;
  selectedUpObject: ProdMeasureType;
  selectedDelObject: ProdMeasureType;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //filter variables
  param: ProductParam = new ProductParam();
  measureTypes: MeasureType[];

  //user connected
  user: Profil;

  constructor(
    private stockLimitService: StockLimitService,
    private measureTypeService: MeasureTypeService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getStockLimit();
    this.getMeasureTypes();
  }

  //get list of stock limit
  getStockLimit(): void {
    this.isLoading = true;  this.stockLimit = [];
    this.stockLimitService.getStockLimit(this.user)
      .then(
        stockLimit => {
        this.isLoading = false;
        this.stockLimit = stockLimit;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getStockLimit

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getStockLimit();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getStockLimit();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getStockLimit();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: ProdMeasureType): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: ProdMeasureType): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate

  //get list of measure types
  getMeasureTypes(): void {
    this.measureTypes = [];
    this.measureTypeService.getMeasureTypes(this.user)
      .then(
        measureTypes => {
          let emptyObj : MeasureType =  new MeasureType(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.measureTypes.push(emptyObj);
          measureTypes.filter(obj => this.measureTypes.push(obj));
        },
        error => {
        }
      );
  }//fin getMeasureTypes

  goBack(): void {
    this.location.back();
  }

}
