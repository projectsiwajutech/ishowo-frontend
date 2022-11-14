import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/shared/models/agency/agency';
import { Group } from 'src/app/shared/models/group/group';
import { Profil } from 'src/app/shared/models/profil/profil';
import { User } from 'src/app/shared/models/user/user';
import { AgencyService } from 'src/app/shared/services/agency/agency.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss']
})
export class ProfileCreateComponent implements OnInit, OnChanges {

  @Input() subject: string;
  item: Profil;
  agencies: Agency[];
  users: User[];
  groups: Group[];

  show: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private profilService: ProfileService,
    private locStorService: LocalStorageService,
    private agencyService: AgencyService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
    this.item = new Profil();
    this.getAgencies();
    this.getUsers();
    this.getGroups();
  }

  ngOnChanges(): void {
    this.item = new Profil();
  }//end ngOnChanges

  //create object
  save(form: any) {
    this.show = true;
    this.item.agent = this.user;
    this.item.login = form.login;
    this.item.code = form.code;
    this.item.agent = this.user;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.profilService.createProfile(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          // /this.item = result;
          this.item = new Profil();
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

  //hide the form
  hideForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new Profil();
  }

  //get list of agencies
  getAgencies(): void {
    this.agencies = [];
    this.agencyService.getAgencies(this.user)
      .then(
        agencies => {
          this.agencies = agencies;
        },
        error => {
        }
      );
  }//fin getAgencies

  //get list of users
  getUsers(): void {
    this.users = [];
    this.userService.getAgents(this.user)
      .then(
        users => {
          this.users = users;
        },
        error => {
        }
      );
  }//fin getUsers

  //get list of groups
  getGroups(): void {
    this.groups = [];
    this.userService.getGroupsList()
      .then(
        groups => {
          this.groups = groups;
        },
        error => {
        }
      );
  }//fin getGroups

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
    document.getElementById("user_name").focus();
  }


}
