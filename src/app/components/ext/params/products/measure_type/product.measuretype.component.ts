




import {Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {ProductService} from "../../../../services/product/product.service";
import {MeasureType} from "../../../../models/measuretype/measuretype";
import {MeasureAssociation} from "../../../../models/measureassociation/measureassociation";
import {LibraryService} from "../../../../services/app/library.service";
import {ProdMeasureType} from "../../../../models/prodmeasuretype/prodmeasuretype";


@Component({
  selector: 'it-product-measuretype',
  templateUrl: './product.measuretype.component.html',
  //styleUrls: ['./orders.component.css']

})

export class ProductMeasureTypeComponent implements OnInit, OnChanges{

  @Input() measureTypes: MeasureType[];
  @Input() addedMeasureTypes: ProdMeasureType[];

  //selected objects
  selectedMeasureType: MeasureType;


  @Output() list_changed = new EventEmitter<ProdMeasureType[]>();

  @Input() subject: string;
  isRemoving = false;


  constructor(
    private productService: ProductService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void{
  }

  ngOnChanges(): void{
    if(this.addedMeasureTypes === undefined || this.addedMeasureTypes === null){
      this.addedMeasureTypes = [];
    }
  }

  //add type mesure
  addMesureType () : void{
    if (this.selectedMeasureType === undefined || this.selectedMeasureType === null ||  this.selectedMeasureType.id === undefined) return;
    if(this.addedMeasureTypes === undefined || this.addedMeasureTypes === null){ this.addedMeasureTypes = []; }

    //no double in measure types
    var search = this.addedMeasureTypes.filter( mt => mt.measure_type.id === this.selectedMeasureType.id);
    if (search.length !== 0) return ;
    let pmt : ProdMeasureType  = new ProdMeasureType(); pmt.measure_type = this.selectedMeasureType;
    this.addedMeasureTypes.push(pmt);
    this.list_changed.emit(this.addedMeasureTypes);

    //clean
    this.selectedMeasureType = undefined;
  }//fin addTypeMesure

  //remove measure type
  removeMeasureType(index: number, measureTypeLine: ProdMeasureType) : void{
    this.isRemoving = true;
    this.productService.deleteProdMeasureType(measureTypeLine)
      .then(
        result => {
          this.isRemoving = false;
          this.addedMeasureTypes.splice(index, 1);
          this.list_changed.emit(this.addedMeasureTypes);
        },
        error => {
          this.isRemoving = false; }
      );
  }//fin removeMeasureType



}
