import { LibraryService } from 'src/app/shared/services/app/library.service';
import { Role } from 'src/app/shared/models/role/role';
import { GroupeHandler } from 'src/app/shared/models/groupe_handler/groupe_handler';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardF1Guard implements CanActivate, CanLoad {

  constructor(
    private localstorageService: LocalStorageService,
    private libraryService: LibraryService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let group: GroupeHandler = this.localstorageService.getGroup();

    let roleF1: Role = group.laws.filter(law => law.reference === "F1")[0]

    if (roleF1.ischecked == true) {
      return true;
    } else {
      this.libraryService.onError('Vous n\'êtes pas autorisé à accéder à cette page !', 1500, 'top');
      return false;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let group: GroupeHandler = this.localstorageService.getGroup();

    let roleF1: Role = group.laws.filter(law => law.reference === "F1")[0]

    if (roleF1.ischecked == true) {
      return true;
    } else {
      this.libraryService.onError('Vous n\'êtes pas autorisé à accéder à cette page !', 1500, 'top');
      return false;
    }
  }
}
