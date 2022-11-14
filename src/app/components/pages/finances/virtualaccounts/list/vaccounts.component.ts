import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/shared/models/profil/profil';
import { VirtualAccount } from 'src/app/shared/models/virtualaccount/virtualaccount';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { VirtualAccountService } from 'src/app/shared/services/virtualaccount/virtualaccount.service';
import { VaccountCreateComponent } from '../create/vaccount-create.component';
import { VaccountDeleteComponent } from '../delete/vaccount-delete.component';
import { VaccountUpdateComponent } from '../update/vaccount-update.component';

@Component({
  selector: 'app-vaccounts',
  templateUrl: './vaccounts.component.html',
  styleUrls: ['./vaccounts.component.scss']
})
export class VaccountsComponent implements OnInit{

  vaccounts : VirtualAccount[] = [] ;
  selectedUpObject: VirtualAccount;
  selectedDelObject: VirtualAccount;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  noData: boolean;
  page  : number = 1;
  pageSize  : number = 30;

  //user connected
  user: Profil;

  constructor(
    private modalService: NgbModal,
    private vAccountService: VirtualAccountService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getVirtualAccounts();
  }

  //get list of account
  getVirtualAccounts(): void {
    this.isLoading = true;  this.vaccounts = [];
    this.vAccountService.getVirtualAccounts(this.user)
      .then(
        banks => {
          this.isLoading = false;
          if (banks.length === 0) { this.noData = true; } else { this.noData = false; }
          this.vaccounts = banks;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getVirtualAccounts

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

 //modal d'ajout
 createModal() {
  const modalRef = this.modalService.open(VaccountCreateComponent);
  modalRef.componentInstance.created.subscribe((receivedEntry) => {
  })
}// end createModal

deleteModal(agency: any) {
  const modalRef = this.modalService.open(VaccountDeleteComponent);
  modalRef.componentInstance.item = agency;
}// end createModal

 //modal de mis-à-jour
 updateModal(agency: any) {
  const modalRef = this.modalService.open(VaccountUpdateComponent);
  modalRef.componentInstance.item = agency;
}//fin updateModal


}
