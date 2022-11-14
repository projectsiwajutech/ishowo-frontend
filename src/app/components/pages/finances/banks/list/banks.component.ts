import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bank } from 'src/app/shared/models/bank/bank';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { BankService } from 'src/app/shared/services/bank/bank.service';
import { BankCreateComponent } from '../create/bank-create.component';
import { BankDeleteComponent } from '../delete/bank-delete.component';
import { BankUpdateComponent } from '../update/bank-update.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit{
  page= 1;
  pageSize= 30;
  banks : Bank[] = [] ;
  selectedUpObject: Bank;
  selectedDelObject: Bank;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  noData: boolean

  //user connected
  dtOptions: any;
  user: Profil;

  constructor(
    private modalService: NgbModal,
    private constantService: ConstantService,
    private bankService: BankService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getBanks();
    this.dtOptions = this.constantService.DtOptions;
  }

  //get list of banks
  getBanks(): void {
    this.isLoading = true;  this.banks = [];
    this.bankService.getBanks(this.user)
      .then(
        banks => {
          this.isLoading = false;
          if (banks.length === 0) { this.noData = true; } else { this.noData = false; }
          this.banks = banks;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getBanks

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(BankCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  deleteModal(agency: any) {
    const modalRef = this.modalService.open(BankDeleteComponent);
    modalRef.componentInstance.item = agency;
  }// end createModal

   //modal de mis-à-jour
   updateModal(agency: any) {
    const modalRef = this.modalService.open(BankUpdateComponent);
    modalRef.componentInstance.item = agency;
  }//fin updateModal

}
