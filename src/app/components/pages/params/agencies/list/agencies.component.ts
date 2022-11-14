import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';


import { ConstantService } from '../../../../../shared/services/app/constant.service';
import { Agency } from 'src/app/shared/models/agency/agency';
import { Profil } from 'src/app/shared/models/profil/profil';
import { AgencyService } from 'src/app/shared/services/agency/agency.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgencyCreateComponent } from '../create/agency-create.component';
import { AgencyUpdateComponent } from '../update/agency-update.component';
import { AgencyDeleteComponent } from '../delete/agency-delete.component';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.scss']
})
export class AgenciesComponent implements OnInit {
  agencies: Agency[] = [];
  selectedUpObject: Agency;
  selectedDelObject: Agency;
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
    private agencyService: AgencyService,
    private locStorService: LocalStorageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getAgencies();
    this.dtOptions = this.constantService.DtOptions;
  }

  //get list of agencies
  getAgencies(): void {
    this.isLoading = true; this.agencies = [];
    this.agencyService.getAgencies(this.user)
      .then(
        agencies => {
          this.isLoading = false;
          if (agencies.length === 0) { this.noData = true; } else { this.noData = false; }
          this.agencies = agencies;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getAgencies

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn
  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(AgencyCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  deleteModal(agency: any) {
    const modalRef = this.modalService.open(AgencyDeleteComponent);
    modalRef.componentInstance.item = agency;
  }// end createModal

   //modal de mis-à-jour
   updateModal(agency: any) {
    const modalRef = this.modalService.open(AgencyUpdateComponent);
    modalRef.componentInstance.item = agency;
  }//fin updateModal

}

