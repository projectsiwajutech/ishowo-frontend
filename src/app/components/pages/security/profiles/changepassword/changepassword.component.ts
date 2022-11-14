import { LibraryService } from './../../../../../shared/services/app/library.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Agency } from 'src/app/shared/models/agency/agency';
import { Group } from 'src/app/shared/models/group/group';
import { Profil } from 'src/app/shared/models/profil/profil';
import { User } from 'src/app/shared/models/user/user';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  code: string;
  show: boolean = false;
  modify: boolean = false;
  visible: boolean = false;
  samePassWord: boolean = true;
  @Input() item: Profil;
  @Input() subject: string;
  showPass: boolean;
  showPassword: boolean;
  defaultPass: string = "";

  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  agencies: Agency[] = [];
  users: User[] = [];
  groups: Group[] = [];

  @Output() updated = new EventEmitter<string>();

  //user connected
  user: Profil;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private profileService: ProfileService,
    private locStorService: LocalStorageService,
    private LibraryService: LibraryService,
  ) { }


  ngOnInit(): void {
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }


  //create object
  save(form: any) {
    this.show = true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.login = form.new_login;
    this.item.code = form.pass1;
    this.profileService.updateProfile(this.item)
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

  //hide the form
  hideForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }

  //verification du mot de passe
  checkPassword(password: any) {
    this.show = true;

    this.profileService.cryptPassword(password).then(
      result => {
        this.show = false;
        if (result !== this.item.code) {
          this.LibraryService.onError('Mot de passe incorrect!', 1300, 'top-end');
        }else{
          this.modify = true;
        }
      }
    );
  }//verification du mot de passe

  //select a user
  selectUser(): void {
    if (this.users === null || this.users === undefined) return;
    if (this.users.length !== 0) {
      if (this.item === null || this.item === undefined) this.item = new Profil();

      this.item.user = this.users.filter(user => user.id === this.item.user.id)[0];
    }
  }//fin selectUser

  //select a group
  selectGroup(): void {
    if (this.groups === null || this.groups === undefined) return;
    if (this.groups.length !== 0) {
      if (this.item === null || this.item === undefined) this.item = new Profil();

      this.item.group = this.groups.filter(group => group.id === this.item.group.id)[0];
    }
  }//fin selectGroup

  //select a agency
  selectAgency(): void {
    if (this.agencies === null || this.agencies === undefined) return;
    if (this.agencies.length !== 0) {
      if (this.item === null || this.item === undefined) this.item = new Profil();

      this.item.agency = this.agencies.filter(agency => agency.id === this.item.agency.id)[0];
    }
  }//fin selectAgency



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

  //CheckSamePassword
  CheckSamePassword(passOne: any, passTwo: any){
    if (passOne === passTwo) {
      this.samePassWord = true;
    }else{
      this.samePassWord = false;
    }
  }
  //fin CheckSamePassword

  //Fermeture
  close() {
    this.updated.emit("updated");
    this.activeModal.close();
  }//end close

  onLoadFocus() {
    document.getElementById("password").focus();
  }

  //Afficher Masquer le mot de passe
  showHidePass() {
    var input = document.getElementById("password");

    if ((input as HTMLInputElement).type === "password") {
      (input as HTMLInputElement).type = "text";
      this.showPass = true;
    }
    else {
      (input as HTMLInputElement).type = "password";
      this.showPass = false;
    }
  }

  //Afficher Masquer le mot de passe
  showHidePassword() {
    var input = document.getElementById("pass2");

    if ((input as HTMLInputElement).type === "password") {
      (input as HTMLInputElement).type = "text";
      this.showPassword = true;
    }
    else {
      (input as HTMLInputElement).type = "password";
      this.showPassword = false;
    }
  }
}

