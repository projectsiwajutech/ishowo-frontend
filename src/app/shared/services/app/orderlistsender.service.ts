import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class OrderListSender {

    constructor() { }
    // Is used for table pagination

    getOrderListProducts() {
    let lines = localStorage.getItem('addedProducts');
    return JSON.parse(lines);
    }

    setOrderListProducts(products : ProductInStock[]) {
    let productLines = JSON.stringify(products);
    localStorage.setItem('addedProducts', productLines);
    }

}

