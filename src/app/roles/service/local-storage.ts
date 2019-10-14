import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  LocalStorageRepoService,
  LocalStorageRepoServiceFactory
} from '../../_core/localstorage-repo.service';
import { Role } from '../model';

@Injectable()
export class RoleLocalStrgService {
  private repoSrvc: LocalStorageRepoService;

  constructor(factory: LocalStorageRepoServiceFactory) {
    this.repoSrvc = factory.getInstance();
    this.repoSrvc.init('Roles');
  }

  getRole(id: number): Observable<Role> {
    return this.repoSrvc.getOne(id);
  }

  getRoles(): Observable<Role[]> {
    return this.repoSrvc.getList();
  }

  createRole(role: Role): Observable<Role> {
    return this.repoSrvc.create(role);
  }

  updateRole(roleData: any): Observable<Role> {
    return this.repoSrvc.update(roleData);
  }

  deleteRole(id: number): Observable<boolean> {
    return this.repoSrvc.delete(id);
  }
}
