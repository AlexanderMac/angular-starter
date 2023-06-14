import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { User } from '@app/users/model'
import { UserHttpService } from '@app/users/service/http'
import { UserLocalStorageService } from '@app/users/service/local-storage'
import { environment } from '@env/environment'

@Injectable()
export class UserService {
  private _repoSrvc: any

  constructor(ls: UserLocalStorageService, http: UserHttpService) {
    this._repoSrvc = environment.sourceType === 'local-storage' ? ls : http
  }

  getUser(id: number): Observable<User> {
    return this._repoSrvc.getUser(id)
  }

  getUsers(): Observable<User[]> {
    return this._repoSrvc.getUsers()
  }

  createUser(user: User): Observable<User> {
    return this._repoSrvc.createUser(user)
  }

  updateUser(userData: any): Observable<User> {
    return this._repoSrvc.updateUser(userData)
  }

  deleteUser(id: number): Observable<boolean> {
    return this._repoSrvc.deleteUser(id)
  }
}
