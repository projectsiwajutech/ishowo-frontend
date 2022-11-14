import { PeriodParam } from './../../models/query/PeriodParam';
import { LogItem } from './../../models/logitem/logitem';
/**
 * Created by Utilisateur on 26/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Supplier } from '../../models/supplier/supplier';
import { AppService } from '../../services/app/app.service';
import { User } from "../../models/user/user";
import { Group } from "../../models/group/group";
import { Profil } from "../../models/profil/profil";
import { Role } from '../../models/role/role';
import { GroupeHandler } from '../../models/groupe_handler/groupe_handler';

@Injectable()
export class UserService {

  private apiUrl: string;
  private headers: Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

  //get user list
  getAgents(agent: Profil): Promise<User[]> {
    return this.http.get(`${this.apiUrl}auth/agents/${agent.id}`)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }//fin getAgents

  //get customers list
  getCustomers(agent: Profil): Promise<User[]> {
    return this.http.get(`${this.apiUrl}auth/customers/${agent.id}`)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }//fin getCustomers

  //create supplier
  createAgent(obj: User): Promise<User> {
    return this.http
      .post(`${this.apiUrl}auth/createagent`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError);
  }//fin createAgent

  //update supplier
  updateAgent(obj: User): Promise<User> {
    return this.http
      .put(`${this.apiUrl}auth/updateagent`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError);
  }//fin updateAgent

  //delete supplier
  deleteAgent(id: number): Promise<void> {
    const url = `${this.apiUrl}auth/deleteagent/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteAgent

  //get user list
  getGroups(): Promise<GroupeHandler[]> {
    return this.http.get(`${this.apiUrl}params/groups`)
      .toPromise()
      .then(response => response.json() as GroupeHandler[])
      .catch(this.handleError);
  }//fin getGroups

  //get user list
  getGroupsList(): Promise<Group[]> {
    return this.http.get(`${this.apiUrl}params/groupslist`)
      .toPromise()
      .then(response => response.json() as Group[])
      .catch(this.handleError);
  }//fin getGroups

  //get log list
  getLogs(agent: Profil): Promise<LogItem[]> {
    return this.http.get(`${this.apiUrl}params/logs/${agent.id}`)
      .toPromise()
      .then(response => response.json() as LogItem[])
      .catch(this.handleError);
  }//fin getLogs

  //search log list
  searchLogs(obj: PeriodParam): Promise<LogItem[]> {
    return this.http.post(`${this.apiUrl}params/searchlogs`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as LogItem[])
      .catch(this.handleError);
  }//fin searchLogs

  //get roles list
  getRoles(): Promise<Role[]> {
    return this.http.get(`${this.apiUrl}params/roles`)
      .toPromise()
      .then(response => response.json() as Role[])
      .catch(this.handleError);
  }//fin getRoles

  //create groupe
  createGroup(groupe: Group, roles: Role[], agent: Profil): Promise<Group> {
    const body : GroupeHandler = { group: groupe, laws: roles};
    return this.http.post(`${this.apiUrl}params/creategroup/${agent.id}`, JSON.stringify(body), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Group)
      .catch(this.handleError);
  }//fin createGroup

  //update group
  updateGroup(groupe: Group, roles: Role[], agent: Profil): Promise<Group> {
    const body : GroupeHandler = { group: groupe, laws: roles};
    return this.http.put(`${this.apiUrl}params/updategroup/${agent.id}`, JSON.stringify(body), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Group)
      .catch(this.handleError);
  }//fin updateGroup
}
