import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { User } from '@app/users/model'
import { LocalStorageRepoService, LocalStorageRepoServiceFactory } from '@core/localstorage-repo.service'

@Injectable()
export class UserLocalStorageService {
  private repoSrvc: LocalStorageRepoService<User>

  constructor(factory: LocalStorageRepoServiceFactory) {
    this.repoSrvc = factory.getInstance()
    this.repoSrvc.init('Users')
  }

  getUser(id: number): Observable<User> {
    return this.repoSrvc.getOne(id)
  }

  getUsers(): Observable<User[]> {
    return this.repoSrvc.getList()
  }

  createUser(userData: User): Observable<User> {
    return this.repoSrvc.create(userData)
  }

  updateUser(userData: User): Observable<User> {
    return this.repoSrvc.update(userData)
  }

  deleteUser(id: number): Observable<boolean> {
    return this.repoSrvc.delete(id)
  }
}
