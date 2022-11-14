import { GroupeHandler } from './../../../../../shared/models/groupe_handler/groupe_handler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/shared/models/group/group';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { GroupCreateComponent } from '../create/group-create.component';
import { GroupUpdateComponent } from '../update/group-update.component';
import { GroupViewComponent } from '../view/group-view.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: GroupeHandler[] = [];
  selectedUpObject: Group;
  selectedDelObject: Group;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  noData: boolean;
  page: number = 1;
  pageSize: number = 30;
  TOTAL: number;
  //user connected
  dtOptions: any;
  user: Profil;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private locStorService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getGroups();
  }

  //get list of groups
  getGroups(): void {
    this.isLoading = true; this.groups = [];
    this.userService.getGroups()
      .then(
        groups => {
          this.isLoading = false;
          if (groups.length === 0) { this.noData = true; } else { this.noData = false; }
          this.groups = groups;
          this.TOTAL = this.groups.length;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getGroups

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(GroupCreateComponent, { size: 'xl' });
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  //modal de mis-à-jour
  updateModal(group: any) {
    const modalRef = this.modalService.open(GroupUpdateComponent, { size: 'xl' });
    modalRef.componentInstance.handler = group;
  }//fin updateModal

  //modal de détails
  viewModal(group: any) {
    const modalRef = this.modalService.open(GroupViewComponent, { size: 'xl' });
    modalRef.componentInstance.handler = group;
  }//fin viewModal

}
