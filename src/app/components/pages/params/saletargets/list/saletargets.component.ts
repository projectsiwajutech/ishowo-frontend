import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { SaleTarget } from 'src/app/shared/models/saletarget/saletarget';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { SaleTargetService } from 'src/app/shared/services/sale/saletarget.service';
import { SaletargetCreateComponent } from '../create/saletarget-create.component';
import { SaletargetDeleteComponent } from '../delete/saletarget-delete.component';
import { SaletargetUpdateComponent } from '../update/saletarget-update.component';

@Component({
  selector: 'app-saletargets',
  templateUrl: './saletargets.component.html',
  styleUrls: ['./saletargets.component.scss']
})
export class SaletargetsComponent implements OnInit {

  saleTargetList: SaleTarget[] = [];
  selectedUpObject: SaleTarget;
  selectedDelObject: SaleTarget;

  param: PeriodParam = new PeriodParam();
  pageStartIndex: number = 0;
  limitTable: number[] = []; pageLimit: number = 0;
  page  : number = 1;
  pageSize  : number = 30;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  noData: boolean ;

  //user connected
  dtOptions: any;
  user: Profil;

  constructor(

    private modalService: NgbModal,
    private constantService: ConstantService,
    private saletargetService: SaleTargetService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
  ) { }

  ngOnInit(): void {
    this.dtOptions = this.constantService.DtOptions;
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getSaleTargetList();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of saletarget list
  getSaleTargetList(): void {
    this.isLoading = true; this.saleTargetList = [];
    this.saletargetService.getSaleTargetList(this.user)
      .then(
        saletargetlist => {
          this.isLoading = false;
          if (saletargetlist.length === 0) { this.noData = true; } else { this.noData = false; }
          this.saleTargetList = saletargetlist;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getSaleTargetList

  //search saletarget list
  searchData(): void {
    this.isLoading = true; this.saleTargetList = [];
    this.saletargetService.searchSaleTarget(this.param)
      .then(
        saletargetlist => {
          this.isLoading = false;
          if (saletargetlist.length === 0) { this.noData = true; } else { this.noData = false; }
          this.saleTargetList = saletargetlist;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchSaleTargetList

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //start date
  getSelectedDateStart(event: any): void {
    this.param.startDate = event;
  }//fin getSelectedDateStart

  //end date
  getSelectedDateEnd(event: any): void {
    this.param.endDate = event;
  }//fin getSelectedDateEnd

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(SaletargetCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  //modal de mis-à-jour
  updateModal(saletarget: any) {
    const modalRef = this.modalService.open(SaletargetUpdateComponent);
    modalRef.componentInstance.item = saletarget;
  }//fin updateModal

  //modal de suppression
  deleteModal(saletarget: any) {
    const modalRef = this.modalService.open(SaletargetDeleteComponent);
    modalRef.componentInstance.item = saletarget;
  }//fin suppression

}
