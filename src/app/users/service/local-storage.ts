import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
  LocalStorageRepoService,
  LocalStorageRepoServiceFactory
} from '../../_core/localstorage-repo.service'
import { User } from '../model'

@Injectable()
export class UserLocalStrgService {
  private repoSrvc: LocalStorageRepoService

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

  createUser(user: User): Observable<User> {
    return this.repoSrvc.create(user)
  }

  updateUser(userData: any): Observable<User> {
    return this.repoSrvc.update(userData)
  }

  deleteUser(id: number): Observable<boolean> {
    return this.repoSrvc.delete(id)
  }
}
