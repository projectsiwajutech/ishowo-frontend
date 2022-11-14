/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {StockLimitService} from "../../../../services/stocklimit/stocklimit.service";
import {ProdOnAlert} from "../../../../models/product/prodonalert";
import {MeasureTypeService} from "../../../../services/measuretype/measuretype.service";
import {ProductParam} from "../../../../models/query/ProductParam";
import {MeasureType} from "../../../../models/measuretype/measuretype";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {ProductInStock} from "../../../../models/product/productinstock";

@Component({
  selector: 'it-understock-limit',
  templateUrl: './understock.limit.component.html',
  styleUrls: ['./understock.limit.component.css']

})

export class UnderStockLimitComponent implements OnInit{

  underStockList : ProductInStock[] = [] ;
   @Input() isOnDashBoard: boolean = true;

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
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getUnderStockProdList();
    this.getMeasureTypes();
  }

  //get list of stock limit
  getUnderStockProdList(): void {
    this.isLoading = true;  this.underStockList = [];
    this.stockLimitService.getProdUnderStockLimit(this.user)
      .then(
        underStockList => {
        this.isLoading = false;
        this.underStockList = underStockList;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getUnderStockProdList

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //hide the form
  hideForm() : void {
    let link = ['/app/orders_main'];
    this.router.navigate(link);
  }

  //get list of measure types
  getMeasureTypes(): void {
    this.measureTypes = [];
    this.measureTypeService.getMeasureTypes(this.user)
      .then(
        measureTypes => {
          let emptyObj : MeasureType =  new MeasureType(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.measureTypes.push(emptyObj);
          if(measureTypes !== null){
            measureTypes.filter(obj => this.measureTypes.push(obj));
          }
          //this.measureTypes = measureTypes;
        },
        error => {
        }
      );
  }//fin getMeasureTypes


  goBack(): void {
    this.location.back();
  }

}
