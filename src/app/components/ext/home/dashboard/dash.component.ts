import { Licence } from './../../../models/licence/licence';
/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';
import {AgencyService} from "../../../services/agency/agency.service";


@Component({
  selector: 'it-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']

})

export class DashComponent implements OnInit{

  canShowLicence: boolean = true;

  constructor(
    private agencyService: AgencyService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{

  }

  //receive licence data
  onLicenceCommunicated(event: any): void{
      this.canShowLicence = event;
  }//fin onLicenceCommunicated




}
