import { Message } from 'primeng/primeng';
import { AppService } from './../../services/app/app.service';

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';
import {LocalStorageService} from "../../services/app/localstorage.service";
import {AccessService} from "../../services/app/access.service";
import {Profil} from "../../models/profil/profil";
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

@Component({
  selector: 'it-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']

})

export class MainComponent implements OnInit{

  user: Profil  ; // @Input()

    //var for idle check
  idleState: any = 'Not started.';
  timedOut: any = false;
  lastPing?: Date = null;

  //for side chat
  isSideChatVisible: boolean = false;

  constructor(
    private locStorService: LocalStorageService,
    private accessService: AccessService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private idle: Idle, private keepalive: Keepalive
  ) {
         //tasks for idle check
              // sets an idle timeout of 5 seconds, for testing purposes.
              idle.setIdle(this.appService.getIdleDuration());
              // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
              idle.setTimeout(this.appService.getTimeOut());
              // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
              idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
              
              //
              idle.onIdleEnd.subscribe(() => {
                this.idleState = 'No longer idle.';
              });

              idle.onTimeout.subscribe(() => {
                this.idleState = 'Timed out!';
                this.timedOut = true;
                this.logOut();
              });

              //idle start
              idle.onIdleStart.subscribe(() => { 
                this.idleState = 'You\'ve gone idle!';  
                //alert("Vous serez déconnecté dans 10 minutes");
              });

              //timeout warning
              idle.onTimeoutWarning.subscribe((countdown: any) => {    
               this.idleState = 'You will time out in ' + countdown + ' seconds!';
              }
              );

              // sets the ping interval to z seconds
              keepalive.interval(this.appService.getKeepAlive());

              keepalive.onPing.subscribe(() => this.lastPing = new Date());

              this.reset();
  }

  ngOnInit(): void{
    if(this.user === null){   this.logOut(); }
    try{
      this.user = this.locStorService.getUser();
    }catch(e){
      this.logOut();
    }
  }

  getUser(){
    if(this.user === null) {this.logOut(); return "";}
    return this.user.user.lastname + " " + this.user.user.firstname;
  }

  //check visibility on user profile
  checkVisibility(obj: string): boolean{
    try{
    if(this.user === null){   this.logOut();  return false; }

      let visibility: boolean =  this.accessService.checkUserAuthorization(obj, this.user.group.name);

      if(visibility === true){
           visibility =  this.accessService.isAllowedAccessToModule(obj, this.user.agency.company.currentLicence);
      }
      return visibility;

    }catch(e){
      this.logOut();
    }
  }//fin checkVisibility

  //log out
  logOut() : void {
    this.locStorService.saveUser(null);
    let link = ['/login'];
    this.router.navigate(link);
  }

     //used to reset
    reset(): void {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  //show side chat
  showSideChat(): void{
      this.isSideChatVisible = true;
  }//fin showSideChat

  //close side chat 
  closeSideChat(): void {
      this.isSideChatVisible = false;
  }//fin closeSideChat
  


}
