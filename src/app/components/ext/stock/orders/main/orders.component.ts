/**
 * Created by Utilisateur on 26/03/2017.
 */


import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Order} from '../../../../models/order/order';
import {OrderService} from '../../../../services/order/order.service';



@Component({
  selector: 'it-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']

})

export class OrderComponent implements OnInit{



  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void{
  }

  //creer une commande
  createCommand(): void{
    let link = ['/app/orders_create'];
    this.router.navigate(link);
  }//fin createCommand

  //liste les commandes
  listCommand(): void{
    let link = ['/app/orders_list'];
    this.router.navigate(link);
  }//fin listCommand

  //vue du stock des produits
  prodStock(): void{
    let link = ['/app/stock_view'];
    this.router.navigate(link);
  }//fin prodStock

  //config des seuils de stock
  seuilStock(): void{
    let link = ['/app/stock_limit'];
    this.router.navigate(link);
  }//fin seuilStock

  //vue des produits hors seuils
  prodSousSeuil(): void{
    let link = ['/app/stock_alert'];
    this.router.navigate(link);
  }//fin seuilStock

  //transfert de stock
  transfertStock(): void{
    let link = ['/app/stock_transfer'];
    this.router.navigate(link);
  }//fin transfertStock

  //historique des modifications du stock
  historiqueUpdateStock(): void{
    let link = ['/app/stock_archive'];
    this.router.navigate(link);
  }//fin historiqueUpdateStock

    //vue de lecran de generation de code barre
  prodBarCode(): void{
    let link = ['/app/stock_gen_barcode'];
    this.router.navigate(link);
  }//fin prodBarCode

  goBack(): void {
    this.location.back();
  }

  //produits expires 
  prodExpires() : void {
    let link = ['/app/stock_prod_exp'];
    this.router.navigate(link);
  }//end prodExpires

}
