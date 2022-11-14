import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinOperation } from 'src/app/shared/models/finoperation/finoperation';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { VirtualAccountService } from 'src/app/shared/services/virtualaccount/virtualaccount.service';
import { OperationCreateComponent } from '../create/operation-create.component';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit{
  page=1;
  pageSize= 30;
  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();
  operations : FinOperation[] = [] ;
  isCreateVisible: boolean = false;
  isLoading: boolean = false; noData: boolean;

  //user connected
  user: Profil;
  param: PeriodParam = new PeriodParam();
  pageStartIndex : number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  constructor(
    private modalService: NgbModal,
    private vAccountService: VirtualAccountService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getFinOperations();
  }

  //get list of finoperations
  getFinOperations(): void {
    this.isLoading = true;  this.operations = [];
    this.vAccountService.getFinOperations(this.user)
      .then(
        operations => {
          this.isLoading = false;
          if (operations.length === 0) { this.noData = true; } else { this.noData = false; }
          this.operations = operations;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getFinOperations

    //get list of sales
  searchData(form: any): void {
    this.param.startDate = new Date(form.dateStart);
    this.param.startDate.setHours(0, 0, 0);
    this.param.endDate = new Date(form.dateEnd);
    this.param.endDate.setHours(23, 59, 59,);
    this.isLoading = true;  this.operations = [];
    this.vAccountService.searchFinOperations(this.param)
      .then(
        operations => {
          this.isLoading = false;
          if (operations.length === 0) { this.noData = true; } else { this.noData = false; }
          this.operations = operations;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchData

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(OperationCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

}
