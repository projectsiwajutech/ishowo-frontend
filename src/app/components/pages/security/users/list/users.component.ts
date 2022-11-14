import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/shared/models/profil/profil';
import { User } from 'src/app/shared/models/user/user';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UserCreateComponent } from '../create/user-create.component';
import { UserDeleteComponent } from '../delete/user-delete.component';
import { UserUpdateComponent } from '../update/user-update.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  agents : User[] = [] ;
  selectedUpObject: User;
  selectedDelObject: User;

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
    private userService: UserService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getUsers();
    this.dtOptions = this.constantService.DtOptions;
  }

  //get list of users
  getUsers(): void {
    this.isLoading = true;  this.agents = [];
    this.userService.getAgents(this.user)
      .then(
        agents => {
        this.isLoading = false;
          if (agents.length === 0) { this.noData = true; } else { this.noData = false; }
          this.agents = agents;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getUsers

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(UserCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  deleteModal(agency: any) {
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.item = agency;
  }// end createModal

   //modal de mis-à-jour
   updateModal(agency: any) {
    const modalRef = this.modalService.open(UserUpdateComponent);
    modalRef.componentInstance.item = agency;
  }//fin updateModal
}
