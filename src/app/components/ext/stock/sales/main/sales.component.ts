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

import {Order} from '../../../../models/order/order';
import {OrderService} from '../../../../services/order/order.service';
import {SaleService} from "../../../../services/sale/sale.service";



@Component({
  selector: 'it-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']

})

export class SalesComponent implements OnInit{



  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  constructor(
    private saleService: SaleService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void{
  }

  //creer une vente
  createSale(): void{
    let link = ['/app/sales_create'];
    this.router.navigate(link);
  }//fin createSale

    //creer une vente a credit
  createSalePartial(): void{
    let link = ['/app/sales_partial_create'];
    this.router.navigate(link);
  }//fin createSalePartial

  //liste les ventes
  listSale(): void{
    let link = ['/app/sales_list'];
    this.router.navigate(link);
  }//fin listSale

  //vue de la liste des devis
  listCostEstimate(): void{
    let link = ['/app/cost_estimate_list'];
    this.router.navigate(link);
  }//fin listCostEstimate

  goBack(): void {
    this.location.back();
  }

}
