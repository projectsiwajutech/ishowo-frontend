/**
 * Created by Utilisateur on 13/04/2017.
 */


import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
// import {MeasureType} from "../../../../models/measuretype/measuretype";
import {MeasureAssociation} from "../../../../models/measureassociation/measureassociation";
// import {MeasureTypeService} from "../../../../services/measuretype/measuretype.service";
import {LibraryService} from "../../../../services/app/library.service";
import {ProductService} from "../../../../services/product/product.service";
import {ProdMeasureType} from "../../../../models/prodmeasuretype/prodmeasuretype";


@Component({
  selector: 'it-product-contenance-list',
  templateUrl: './product.contenance.list.component.html'
})
export class ProductContenanceListComponent implements  OnInit, OnChanges{
  public theDate: Date = new Date();

  @Input() measure_types: ProdMeasureType[] = [];
  @Input() associations: MeasureAssociation[];

  @Output() list_changed = new EventEmitter<MeasureAssociation[]>();
  @Output() list_checked = new EventEmitter<boolean>();

  isRemoving: boolean = false;

  public constructor(
    //private measureTypeService: MeasureTypeService,
    private productService: ProductService,
  private libraryService: LibraryService,
  ) {  }

    ngOnInit(): void{
      this.list_checked.emit(this.isComponentValid());
    }

    ngOnChanges(): void{
      this.list_checked.emit(this.isComponentValid());
    }

  //add line
  addLine(): void{
    if( this.associations === undefined){ this.associations = []; }
    //if existing
    if(this.measure_types === undefined || this.measure_types.length === 0){
      this.libraryService.showMessage("Veuillez ajouter au moins un type de mesure"); return;
    }
    //number logically limit
    let logicalLength : number = this.measure_types.length;
    if( this.associations.length === (logicalLength - 1)){
      this.libraryService.showMessage("Vous ne pouvez pas ajouter plus d'associations"); return;
    }

    //add now
    let assoc: MeasureAssociation = new MeasureAssociation();
    assoc.index = this.associations.length +1; assoc.quantity = 0;
    assoc.bulk = new ProdMeasureType(); assoc.retail = new ProdMeasureType();

    this.associations.push(assoc);
    this.list_checked.emit(this.isComponentValid());
  }//fin addLine

  getItem(event: any, index: number): void{
    this.list_changed.emit(this.associations);
    this.list_checked.emit(this.isComponentValid());
  }

  //check component validity
  isComponentValid(): boolean{
    let isValid : boolean = true;
    if(this.associations === undefined) return false;
    for(let i = 0; i < this.associations.length; i++){
      if(this.associations[i].bulk === undefined || this.associations[i].retail === undefined ||
        this.associations[i].bulk === null || this.associations[i].retail === null
          || this.associations[i].quantity === 0
      || this.libraryService.isValidNumber(this.associations[i].quantity) === false){
        isValid = false;
      }
    }
    return isValid;
  }//fin isComponentValid

  //track by
  trackByFn(index: number, item: any): any{
    return item.index;
  }//fin trackByFn



  //on element remove event
  onItemRemove(event: any, index: number): void{
    this.isRemoving = true;
    //remove from db
    this.productService.deleteProdAssociation(event)
      .then(
        result => {
          this.isRemoving = false;

          this.associations.splice(index, 1);
          this.list_changed.emit(this.associations);
          this.list_checked.emit(this.isComponentValid());
        },
        error => {
          this.isRemoving = false; }
      );

  }//fin onItemRemove



}
