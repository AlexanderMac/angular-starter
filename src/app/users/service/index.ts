import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { UserLocalStrgService } from './local-storage'
import { UserHttpService } from './http'
import { User } from '../model'

declare const SRVC_TYPE: string

@Injectable()
export class UserService {
  private repoSrvc: any

  constructor(ls: UserLocalStrgService, http: UserHttpService) {
    this.repoSrvc = SRVC_TYPE === 'local-storage' ? ls : http
  }

  getUser(id: number): Observable<User> {
    return this.repoSrvc.getUser(id)
  }

  getUsers(): Observable<User[]> {
    return this.repoSrvc.getUsers()
  }

  createUser(user: User): Observable<User> {
    return this.repoSrvc.createUser(user)
  }

  updateUser(userData: any): Observable<User> {
    return this.repoSrvc.updateUser(userData)
  }

  deleteUser(id: number): Observable<boolean> {
    return this.repoSrvc.deleteUser(id)
  }
}
