import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
  LocalStorageRepoService,
  LocalStorageRepoServiceFactory
} from '../../_core/localstorage-repo.service'
import { Role } from '../model'

@Injectable()
export class RoleLocalStrgService {
  private _repoSrvc: LocalStorageRepoService

  constructor(factory: LocalStorageRepoServiceFactory) {
    this._repoSrvc = factory.getInstance()
    this._repoSrvc.init('Roles')
  }

  getRole(id: number): Observable<Role> {
    return this._repoSrvc.getOne(id)
  }

  getRoles(): Observable<Role[]> {
    return this._repoSrvc.getList()
  }

  createRole(role: Role): Observable<Role> {
    return this._repoSrvc.create(role)
  }

  updateRole(roleData: any): Observable<Role> {
    return this._repoSrvc.update(roleData)
  }

  deleteRole(id: number): Observable<boolean> {
    return this._repoSrvc.delete(id)
  }
}
