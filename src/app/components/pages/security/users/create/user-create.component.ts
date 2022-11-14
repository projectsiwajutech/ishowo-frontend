import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from 'src/app/shared/models/profil/profil';
import { User } from 'src/app/shared/models/user/user';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryService } from 'src/app/shared/services/app/library.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  @Input() subject: string;
  item: User;
  Indicatif = "+229";
  Indicatif1 = "+229";
  Indicatif2 = "+228";
  phoneValid: boolean = true;

  show: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    ) { }

  ngOnInit(): void {
    this.onLoadFocus();
    this.item = new User();
    this.user = this.locStorService.getUser();
  }

  //phone number format
  public maskMobileNo = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  //create object
  save(form: any) {
    this.show = true;
    this.item.agent = this.user;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.phone = form.indicatif + ' ' + form.phone;
    this.userService.createAgent(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new User();
          this.created.emit("created");
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
    this.visible = true;
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
    this.created.emit("created");
    this.activeModal.close();
  }//end close

  onLoadFocus() {
    document.getElementById("user_name").focus();
   }
}
