import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/shared/models/profil/profil';
import { SaleTarget } from 'src/app/shared/models/saletarget/saletarget';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { SaleTargetService } from 'src/app/shared/services/sale/saletarget.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-saletarget-update',
  templateUrl: './saletarget-update.component.html',
  styleUrls: ['./saletarget-update.component.scss']
})
export class SaletargetUpdateComponent implements OnInit, OnChanges {

  show: boolean = false;
  visible: boolean = false;
  @Input() item: SaleTarget;
  @Input() subject: string;

  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";
  profiles: Profil[];

  @Output() updated = new EventEmitter<string>();

  //user connected
  user: Profil;

  constructor(
    private router : Router,
    public activeModal: NgbActiveModal,
    private saleTargetService: SaleTargetService,
    private profileService: ProfileService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.getProfiles();
  }

  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    if (this.profiles === undefined) { this.getProfiles(); } else { this.selectProfile(); }
  }//end ngOnChanges

  //create object
  save(form: any) {
    this.show = true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.saleTargetService.updateSaleTarget(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;
          this.item = null;
          this.updated.emit("updated");
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = this.libraryService.getServiceErrorText(error);
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }//end save

  //show creation form
  showCreationForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }

  //select a profile
  selectProfile(): void {
    if (this.profiles === null || this.profiles === undefined) return;
    if (this.profiles.length !== 0) {
      if (this.item === null || this.item === undefined) this.item = new SaleTarget();
      this.item.agent = this.profiles.filter(profile => profile.id === this.item.agent.id)[0];
    }
  }//fin selectProfile

  //get list of profiles
  getProfiles(): void {
    this.profiles = [];
    this.profileService.getProfiles(this.user)
      .then(
        profiles => {
          this.profiles = profiles;
          this.selectProfile();
        },
        error => {
        }
      );
  }//fin getProfiles

  //start date
  getSelectedDateStart(dateStart: any): void {
    let format = new Date(dateStart);
    this.item.start_date = format;
  }//fin getSelectedDateStart

  //end date
  getSelectedDateEnd(dateEnd: any): void {
    let format = new Date(dateEnd);
    format.setHours(23, 59, 59, 999)
    this.item.end_date = format;
  }//fin getSelectedDateEnd

   //Enregistrement réussie
   successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal'},
      title: 'Enregistrement réussi!',
      showConfirmButton: false,
      icon : "success",
      timer: 1100,
      timerProgressBar: true,
    })
      let newRouterLink = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([newRouterLink]);
    });
  }

 //Echec de l'enregistrement
errorSwal() {
  Swal.fire('Echec de l\'Enregistrement', '', 'error');
  let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
}

  //Fermeture
  close() {
    this.updated.emit("updated");
    this.activeModal.close();
  }//end close

}
