/**
 * Created by Utilisateur on 26/03/2017.
 */


import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Agency} from '../../../../models/agency/agency';
import {Compartment} from '../../../../models/compartment/compartment';
import {CompartmentService} from '../../../../services/compartment/compartment.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {SaleTarget} from "../../../../models/saletarget/saletarget";
import {SaleTargetService} from "../../../../services/sale/saletarget.service";
import {PeriodParam} from "../../../../models/query/PeriodParam";
import {LibraryService} from "../../../../services/app/library.service";

@Component({
  selector: 'it-saletarget-single',
  templateUrl: './saletarget.single.component.html',
  styleUrls: ['./saletarget.single.component.css']

})

export class SaleTargetSingleComponent implements OnInit{

  saleTargetList : SaleTarget[] = [] ;
  @Input() title: string = "";

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private saletargetService: SaleTargetService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location,
  private libraryService: LibraryService,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getSaleTargetList();
  }

  //get list of saletarget list
  getSaleTargetList(): void {
    this.isLoading = true;  this.saleTargetList = [];
    this.saletargetService.getSaleTargetList(this.user)
      .then(
        saletargetlist => {
        this.isLoading = false;
        this.saleTargetList = saletargetlist;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getSaleTargetList


  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

}
