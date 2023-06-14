import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { User } from '@app/users/model'
import { UserHttpService } from '@app/users/service/http'
import { UserLocalStorageService } from '@app/users/service/local-storage'
import { environment } from '@env/environment'

@Injectable()
export class UserService {
  private repoSrvc: UserLocalStorageService | UserHttpService

  constructor(ls: UserLocalStorageService, http: UserHttpService) {
    this.repoSrvc = environment.sourceType === 'local-storage' ? ls : http
  }

  getUser(id: number): Observable<User> {
    return this.repoSrvc.getUser(id)
  }

  getUsers(): Observable<User[]> {
    return this.repoSrvc.getUsers()
  }

  createUser(userData: User): Observable<User> {
    return this.repoSrvc.createUser(userData)
  }

  updateUser(userData: User): Observable<User> {
    return this.repoSrvc.updateUser(userData)
  }

  deleteUser(id: number): Observable<boolean> {
    return this.repoSrvc.deleteUser(id)
  }
}
