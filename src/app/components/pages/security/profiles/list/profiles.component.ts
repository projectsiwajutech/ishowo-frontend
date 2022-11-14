import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { ProfileCreateComponent } from '../create/profile-create.component';
import { ProfileDeleteComponent } from '../delete/profile-delete.component';
import { ProfileUpdateComponent } from '../update/profile-update.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit{

  profiles : Profil[] = [] ;
  selectedUpObject: Profil;
  selectedDelObject: Profil;

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
    private profileService: ProfileService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getProfiles();
    this.dtOptions = this.constantService.DtOptions;
  }

  //get list of profiles
  getProfiles(): void {
    this.isLoading = true;  this.profiles = [];
    this.profileService.getProfiles(this.user)
      .then(
        profiles => {
        this.isLoading = false;
          if (profiles.length === 0) { this.noData = true; } else { this.noData = false; }
          this.profiles = profiles;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getProfiles

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(ProfileCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  deleteModal(agency: any) {
    const modalRef = this.modalService.open(ProfileDeleteComponent);
    modalRef.componentInstance.item = agency;
  }// end createModal

   //modal de mis-à-jour
   updateModal(agency: any) {
    const modalRef = this.modalService.open(ProfileUpdateComponent);
    modalRef.componentInstance.item = agency;
  }//fin updateModal

    //modal de mis-à-jour
    changePassModal(agency: any) {
      const modalRef = this.modalService.open(ChangepasswordComponent);
      modalRef.componentInstance.item = agency;
    }//fin updateModal

}
