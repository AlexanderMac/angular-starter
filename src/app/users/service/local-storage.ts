import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { User } from '@app/users/model'
import { LocalStorageRepoService, LocalStorageRepoServiceFactory } from '@core/localstorage-repo.service'

@Injectable()
export class UserLocalStorageService {
  private _repoSrvc: LocalStorageRepoService

  constructor(factory: LocalStorageRepoServiceFactory) {
    this._repoSrvc = factory.getInstance()
    this._repoSrvc.init('Users')
  }

  getUser(id: number): Observable<User> {
    return this._repoSrvc.getOne(id)
  }

  getUsers(): Observable<User[]> {
    return this._repoSrvc.getList()
  }

  createUser(user: User): Observable<User> {
    return this._repoSrvc.create(user)
  }

  updateUser(userData: any): Observable<User> {
    return this._repoSrvc.update(userData)
  }

  deleteUser(id: number): Observable<boolean> {
    return this._repoSrvc.delete(id)
  }
}
