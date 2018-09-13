import { Injectable }           from '@angular/core';
import { Observable }           from 'rxjs/Observable';
import { RoleLocalStrgService } from './local-storage';
import { RoleHttpService }      from './http';
import { Role }                 from '../model';

declare const SRVC_TYPE: string;

@Injectable()
export class RoleService {
  private repoSrvc: any;

  constructor(ls: RoleLocalStrgService, http: RoleHttpService) {
    this.repoSrvc = SRVC_TYPE === 'local-storage' ? ls : http;
  }

  getRole(id: number): Observable<Role> {
    return this.repoSrvc.getRole(id);
  }

  getRoles(): Observable<Role[]> {
    return this.repoSrvc.getRoles();
  }

  createRole(role: Role): Observable<Role> {
    return this.repoSrvc.createRole(role);
  }

  updateRole(roleData: any): Observable<Role> {
    return this.repoSrvc.updateRole(roleData);
  }

  deleteRole(id: number): Observable<boolean> {
    return this.repoSrvc.deleteRole(id);
  }
}
