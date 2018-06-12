import { Injectable }                     from '@angular/core';
import { Observable }                     from 'rxjs/Observable';
import { LocalStorageRepoService,
         LocalStorageRepoServiceFactory } from '../_core/localstorage-repo.service';
import { Role }                           from './model';

@Injectable()
export class RoleService {
  private repoSrvc: LocalStorageRepoService;

  constructor(factory: LocalStorageRepoServiceFactory) {
    this.repoSrvc = factory.getInstance(window);
    this.repoSrvc.init('Roles');
  }

  getRole(id: number): Observable<Role> {
    return this.repoSrvc.getOne(id);
  }

  getRoles(): Observable<Role[]> {
    return this.repoSrvc.getList();
  }

  createRole(user: Role): Observable<Role> {
    return this.repoSrvc.create(user);
  }

  updateRole(userData: any): Observable<Role> {
    return this.repoSrvc.update(userData);
  }

  deleteRole(id: number): Observable<boolean> {
    return this.repoSrvc.delete(id);
  }
}
