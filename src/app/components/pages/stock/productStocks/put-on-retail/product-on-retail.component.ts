import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';

@Component({
  selector: 'app-product-on-retail',
  templateUrl: './product-on-retail.component.html',
  styleUrls: ['./product-on-retail.component.scss']
})
export class ProductOnRetailComponent implements OnInit {

  @Input() item: ProductInStock;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }
 //Fermeture
 close() {
  this.activeModal.close();
}//end close
}
