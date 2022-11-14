import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/shared/models/customer/customer';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { SupplierService } from 'src/app/shared/services/supplier/supplier.service';
import { CustomerCreateComponent } from '../create/customer-create.component';
import { CustomerDeleteComponent } from '../delete/customer-delete.component';
import { CustomerUpdateComponent } from '../update/customer-update.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];
  selectedUpObject: Customer;
  selectedDelObject: Customer;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  page  : number = 1;
  pageSize  : number = 30;
  noData: boolean;

  //user connected
  dtOptions: any;
  user: Profil;

  constructor(

    private modalService: NgbModal,
    private constantService: ConstantService,
    private locStorService: LocalStorageService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getCustomers()
    this.dtOptions = this.constantService.DtOptions;
  }

//get list of customers
getCustomers(): void {
  this.isLoading = true; this.customers = [];
  this.customerService.getCustomers(this.user)
    .then(
      customers => {
        this.isLoading = false;
          if (customers.length === 0) { this.noData = true; } else { this.noData = false; }
          this.customers = customers;
      },
      error => {
        this.isLoading = false;
      }
    );
}//fin getCustomers

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(CustomerCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  //modal de mis-à-jour
  updateModal(supplier: any) {
    const modalRef = this.modalService.open(CustomerUpdateComponent);
    modalRef.componentInstance.item = supplier;
  }//fin updateModal

  //modal de suppression
  deleteModal(supplier: any) {
    const modalRef = this.modalService.open(CustomerDeleteComponent);
    modalRef.componentInstance.item = supplier;
  }//fin suppression


}
