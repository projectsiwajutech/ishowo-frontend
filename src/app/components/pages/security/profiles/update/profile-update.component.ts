import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Agency } from 'src/app/shared/models/agency/agency';
import { Group } from 'src/app/shared/models/group/group';
import { Profil } from 'src/app/shared/models/profil/profil';
import { User } from 'src/app/shared/models/user/user';
import { AgencyService } from 'src/app/shared/services/agency/agency.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit, OnChanges{

  show: boolean = false;
  visible: boolean = false;
  @Input() item: Profil ;
  @Input() subject: string;

  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  agencies: Agency[] = [];
  users: User[]= [];
  groups: Group[]= [];

  @Output() updated = new EventEmitter<string>();

  //user connected
  user: Profil;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private profileService: ProfileService,
    private locStorService: LocalStorageService,
    private agencyService: AgencyService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void{
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.getUsers();
    this.getAgencies();
    this.getGroups();
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    if(this.users.length !==0){this.selectUser();} else { this.getUsers(); }
    if(this.groups.length !==0){this.selectGroup();} else { this.getGroups(); }
    if(this.agencies.length !==0){this.selectAgency();} else { this.getAgencies(); }
  }//end ngOnChanges

  //create object
  save(form : any){
    this.show=true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
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
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }

  //select a user
  selectUser(): void{
    if(this.users === null || this.users === undefined) return;
    if(this.users.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new Profil();

      this.item.user = this.users.filter( user => user.id === this.item.user.id)[0];
    }
  }//fin selectUser

  //select a group
  selectGroup(): void{
    if(this.groups === null || this.groups === undefined) return;
    if(this.groups.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new Profil();

      this.item.group = this.groups.filter( group => group.id === this.item.group.id)[0];
    }
  }//fin selectGroup

  //select a agency
  selectAgency(): void{
    if(this.agencies === null || this.agencies === undefined) return;
    if(this.agencies.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new Profil();

      this.item.agency = this.agencies.filter( agency => agency.id === this.item.agency.id)[0];
    }
  }//fin selectAgency




  //get list of agencies
  getAgencies(): void {
    this.agencies = [];
    this.agencyService.getAgencies(this.user)
      .then(
        agencies => {
          this.agencies = agencies;
          this.selectAgency();
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
          this.selectUser();
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
          this.selectGroup();
        },
        error => {
        }
      );
  }//fin getGroups


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
