import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { ProdMeasureType } from 'src/app/shared/models/prodmeasuretype/prodmeasuretype';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-measure-type',
  templateUrl: './measure-type.component.html',
  styleUrls: ['./measure-type.component.scss']
})
export class MeasureTypeComponent implements OnInit, OnChanges{

  @Input() measureTypes: MeasureType[];
  @Input() addedMeasureTypes: ProdMeasureType[];

  //selected objects
  selectedMeasureType: MeasureType;


  @Output() list_changed = new EventEmitter<ProdMeasureType[]>();

  @Input() subject: string;
  isRemoving = false;


  constructor(
    private productService: ProductService,
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
