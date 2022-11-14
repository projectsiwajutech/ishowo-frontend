import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { MeasureTypeService } from 'src/app/shared/services/measuretype/measuretype.service';
import { MeasuretypeCreateComponent } from '../create/measuretype-create.component';
import { MeasuretypeDeleteComponent } from '../delete/measuretype-delete.component';
import { MeasuretypeUpdateComponent } from '../update/measuretype-update.component';


@Component({
  selector: 'app-agencies',
  templateUrl: './measuretypes.component.html',
  styleUrls: ['./measuretypes.component.scss']
})
export class MeasuretypesComponent implements  OnInit{

  measureTypes : MeasureType[] = [] ;
  selectedUpObject: MeasureType;
  selectedDelObject: MeasureType;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  noData:boolean;
  page  : number = 1;
  pageSize  : number = 30;

  //user connected
  dtOptions: any;
  user: Profil;

  constructor(

    private modalService: NgbModal,
    private constantService: ConstantService,
    private measureTypeService: MeasureTypeService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getMeasureTypes();
    this.dtOptions = this.constantService.DtOptions;
  }

  //get list of agencies
  getMeasureTypes(): void {
    this.isLoading = true;  this.measureTypes = [];
    this.measureTypeService.getMeasureTypes(this.user)
      .then(
        measureTypes => {
        this.isLoading = false;
          if (measureTypes.length === 0) { this.noData = true; } else { this.noData = false; }
          this.measureTypes = measureTypes;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getMeasureTypes

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  createModal() {
    const modalRef = this.modalService.open(MeasuretypeCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

   //modal de mis-à-jour
   updateModal(measuretype: any) {
    const modalRef = this.modalService.open(MeasuretypeUpdateComponent);
    modalRef.componentInstance.item = measuretype;
  }//fin updateModal

    //modal de suppression
    deleteModal(measuretype: any) {
      const modalRef = this.modalService.open(MeasuretypeDeleteComponent);
      modalRef.componentInstance.item = measuretype;
    }//fin de suppression


}
