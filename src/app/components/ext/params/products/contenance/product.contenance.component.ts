/**
 * Created by Utilisateur on 13/04/2017.
 */




import {Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {ProductService} from "../../../../services/product/product.service";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {MeasureType} from "../../../../models/measuretype/measuretype";
import {MeasureAssociation} from "../../../../models/measureassociation/measureassociation";
import {LibraryService} from "../../../../services/app/library.service";
import {ProdMeasureType} from "../../../../models/prodmeasuretype/prodmeasuretype";


@Component({
  selector: 'it-product-contenance',
  templateUrl: './product.contenance.component.html',
  //styleUrls: ['./orders.component.css']

})

export class ProductContenanceComponent implements OnInit, OnChanges{

  @Input() item: MeasureAssociation;
  @Input() measure_types: ProdMeasureType[];

  //@Input() list: MeasureAssociation[];
  @Input() index: number;
  @Output() item_changed = new EventEmitter<MeasureAssociation>();
  @Output() item_removed = new EventEmitter<MeasureAssociation>();

  @Input() subject: string;


  constructor(
    private productService: ProductService,
    private libraryService: LibraryService,
    //private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void{
  }

  ngOnChanges(): void{
    if(this.item.bulk !== undefined && this.item.bulk !== null  && this.item.bulk.id !== 0){
      this.item.bulk = this.measure_types.filter(x => x.id === this.item.bulk.id )[0];
    }
    if(this.item.retail !== undefined && this.item.retail !== null  && this.item.retail.id !== 0){
      this.item.retail = this.measure_types.filter(x => x.id === this.item.retail.id )[0];
    }
  }

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update object
  updateInternalComponent(): void{
    //check the child
    if(this.item.bulk != undefined && this.item.retail != undefined){
      if(this.item.bulk.measure_type.id === this.item.retail.measure_type.id){
        this.libraryService.showMessage("La mesure parent et la mesure enfant ne peuvent être identiques");
        this.item.retail = new ProdMeasureType();
      }
    }

    this.item_changed.emit(this.item);
  }//fin updateInternalComponent

  //remove association
  removeAssociation(event: any): void{
    event.preventDefault();
    event.stopPropagation();
    this.item_removed.emit(this.item);
    this.item_changed.emit(this.item);
  }//fin removeAssociation


}
