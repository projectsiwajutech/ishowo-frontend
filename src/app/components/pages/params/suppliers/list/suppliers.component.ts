import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/shared/models/profil/profil';
import { Supplier } from 'src/app/shared/models/supplier/supplier';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { SupplierService } from 'src/app/shared/services/supplier/supplier.service';
import { SupplierCreateComponent } from '../create/supplier-create.component';
import { SupplierDeleteComponent } from '../delete/supplier-delete.component';
import { SupplierUpdateComponent } from '../update/supplier-update.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  suppliers: Supplier[] = [];
  selectedUpObject: Supplier;
  selectedDelObject: Supplier;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  noData: boolean;
  page  : number = 1;
  pageSize  : number = 30;


  //user connected
  dtOptions: any;
  user: Profil;

  constructor(

    private modalService: NgbModal,
    private constantService: ConstantService,
    private supplierService: SupplierService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getSuppliers();
    this.dtOptions = this.constantService.DtOptions;
  }

  //get list of suppliers
  getSuppliers(): void {
    this.isLoading = true; this.suppliers = [];
    this.supplierService.getSuppliers(this.user)
      .then(
        suppliers => {
          this.isLoading = false;
          if (suppliers.length === 0) { this.noData = true; } else { this.noData = false; }
          this.suppliers = suppliers;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getSuppliers

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn


  //select for update
  selectForUpdate(obj: Supplier): void {
    this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: Supplier): void {
    this.selectedDelObject = obj;
  }//fin selectForUpdate


  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(SupplierCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  //modal de mis-à-jour
  updateModal(supplier: any) {
    const modalRef = this.modalService.open(SupplierUpdateComponent);
    modalRef.componentInstance.item = supplier;
  }//fin updateModal

  //modal de suppression
  deleteModal(supplier: any) {
    const modalRef = this.modalService.open(SupplierDeleteComponent);
    modalRef.componentInstance.item = supplier;
  }//fin suppression


}
