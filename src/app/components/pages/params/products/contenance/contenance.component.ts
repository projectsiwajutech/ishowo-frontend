import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeasureAssociation } from 'src/app/shared/models/measureassociation/measureassociation';
import { ProdMeasureType } from 'src/app/shared/models/prodmeasuretype/prodmeasuretype';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-contenance',
  templateUrl: './contenance.component.html',
  styleUrls: ['./contenance.component.scss']
})
export class ContenanceComponent implements OnInit, OnChanges{

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
