/**
 * Created by Utilisateur on 28/03/2017.
 */

/**
 * Created by Utilisateur on 28/03/2017.
 */


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
// import 'rxjs/add/operator/map';
import {  map } from 'rxjs/operators';

import {Product} from '../../../../models/product/product';
import {ProductService} from '../../../../services/product/product.service';



@Component({
  selector: 'it-product-delete',
  templateUrl: './product.delete.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class ProductDeleteComponent implements OnInit, OnChanges{

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  visible: boolean = false;
  @Input() item: Product = null;
  @Input() subject: string;
  isDeleting: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() deleted = new EventEmitter<string>();

  ngOnInit(): void{
  }

  ngOnChanges(): void{
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  //create object
  delete(){
    this.isDeleting = true; this.isCompleted = false; this.statusMessage = "";
    this.productService.deleteProduct(this.item.id)
      .then(
        result => {
          this.isDeleting = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = null;;
          this.deleted.emit("deleted");
        },
        error => {
          this.isDeleting = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        }
      );
  }

  //show creation form
  showCreationForm() : void {
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }


}
