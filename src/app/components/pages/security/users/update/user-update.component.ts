import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/user/user';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit, OnChanges {

  constructor(

    private router: Router,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
  ) { }

  show: boolean = false;
  visible: boolean = false;
  @Input() item: User = null;
  @Input() subject: string;
  Indicatif = "+229";
  Indicatif1 = "+229";
  Indicatif2 = "+228";
  phoneValid: boolean = true;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() updated = new EventEmitter<string>();

  ngOnInit(): void {
    this.onLoadFocus();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  ngOnChanges(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //phone number format
  public maskMobileNo = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  //create object
  save(form: any) {
    this.show = true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.phone = form.indicatif + ' ' + form.phone;
    this.userService.updateAgent(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = null;;
          this.updated.emit("updated");
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }

  //show creation form
  showCreationForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //check phone number
  checkPhoneNumber(phone: any) {
    this.phoneValid = false;
    let count = 0;
    let pos = phone.indexOf("_");

    while (pos != -1) {
      count++;
      pos = phone.indexOf("_", pos + 1);
    }
    if (count > 0 || phone === "") {
      this.phoneValid = false;
    } else {
      let filterOne = phone.replaceAll('-', '');
      let filterTwo = filterOne.replaceAll(' ', '');
      let ckeckResponse = this.libraryService.checkPhoneNumber(filterTwo);

      switch (ckeckResponse) {
        case true:
          return this.phoneValid = true;
          break;

        case false:
          return this.phoneValid = false;
          break;

        default:
          return this.phoneValid = false;
          break;
      }

    }
  }//fin check phone number

  //format Phone Number
  formatPhoneNumber(phone: any) {
    let format = this.libraryService.formatPhoneNumber(phone);
    return format;
  }//fin format Phone Number

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

  onLoadFocus() {
    document.getElementById("user_name").focus();
   }
}
