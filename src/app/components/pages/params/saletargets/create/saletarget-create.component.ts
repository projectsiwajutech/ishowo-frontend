import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/shared/models/profil/profil';
import { SaleTarget } from 'src/app/shared/models/saletarget/saletarget';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { SaleTargetService } from 'src/app/shared/services/sale/saletarget.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-saletarget-create',
  templateUrl: './saletarget-create.component.html',
  styleUrls: ['./saletarget-create.component.scss']
})
export class SaletargetCreateComponent implements OnInit, OnChanges {

  @Input() subject: string;
  item: SaleTarget;
  profiles: Profil[];

  show: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;
  error_date: boolean;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private saleTargetService: SaleTargetService,
    private profileService: ProfileService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
    this.item = new SaleTarget();
    this.getProfiles();
  }

  ngOnChanges(): void {
    this.item = new SaleTarget();
  }//end ngOnChanges

  //create object
  save(form: any) {
    this.show = true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.saleTargetService.createSaleTarget(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new SaleTarget();
          this.created.emit("created");
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
    this.visible = true;
  }

  //hide the form
  hideForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new SaleTarget();
  }

  //get list of profiles
  getProfiles(): void {
    this.profiles = [];
    this.profileService.getProfiles(this.user)
      .then(
        profiles => {
          this.profiles = profiles;
        },
        error => {
        }
      );
  }//fin getProfiles

  //start date
  getSelectedDateStart(dateStart: any): void {
    let format = new Date(dateStart);
    this.item.start_date = format;
    // if (this.item.end_date < this.item.start_date) {
    //   this.error_date = true;
    // } else {
    //   this.error_date = false;

    // }
  }//fin getSelectedDateStart

  //end date
  getSelectedDateEnd(dateEnd: any): void {
    let format = new Date(dateEnd);
    format.setHours(23, 59, 59, 999)
    this.item.end_date = format;
    if (format < this.item.start_date) {
      this.error_date = true;
    } else {
      this.error_date = false;
    }
  }//fin getSelectedDateEnd

  //Enregistrement réussie
  successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal' },
      title: 'Enregistrement réussi!',
      showConfirmButton: false,
      icon: "success",
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
    this.created.emit("created");
    this.activeModal.close();
  }//end close

  onLoadFocus() {
    document.getElementById("date_debut").focus();
  }


}
