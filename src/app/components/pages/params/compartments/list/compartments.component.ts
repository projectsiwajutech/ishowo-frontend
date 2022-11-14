import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';
import { CompartmentCreateComponent } from '../create/compartment-create.component';
import { CompartmentDeleteComponent } from '../delete/compartment-delete.component';
import { CompartmentUpdateComponent } from '../update/compartment-update.component';

@Component({
  selector: 'app-compartments',
  templateUrl: './compartments.component.html',
  styleUrls: ['./compartments.component.scss']
})
export class CompartmentsComponent implements OnInit {

  compartments: Compartment[] = [];
  selectedUpObject: Compartment;
  selectedDelObject: Compartment;

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
    private compartmentService: CompartmentService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getCompartments();
    this.dtOptions = this.constantService.DtOptions;
  }

  //get list of compartments
  getCompartments(): void {
    this.isLoading = true; this.compartments = [];
    this.compartmentService.getCompartments(this.user)
      .then(
        compartments => {
          this.isLoading = false;
          if (compartments.length === 0) { this.noData = true; } else { this.noData = false; }
          this.compartments = compartments;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getCompartments

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(CompartmentCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  //modal de mis-à-jour
  updateModal(compartment: any) {
    const modalRef = this.modalService.open(CompartmentUpdateComponent);
    modalRef.componentInstance.item = compartment;
  }//fin updateModal

  //modal de Suppression
  deleteModal(compartment: any) {
    const modalRef = this.modalService.open(CompartmentDeleteComponent);
    modalRef.componentInstance.item = compartment;
  }//fin Suppression


}
