import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { User } from '@app/users/model'

const USERS_URL = '/users/'

@Injectable()
export class UserHttpService {
  constructor(private httpSrvc: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.httpSrvc.get<User>(USERS_URL + id)
  }

  getUsers(): Observable<User[]> {
    return this.httpSrvc.get<User[]>(USERS_URL)
  }

  createUser(userData: User): Observable<User> {
    return this.httpSrvc.post<User>(USERS_URL, userData)
  }

  updateUser(userData: User): Observable<User> {
    return this.httpSrvc.put<User>(USERS_URL + userData.id, userData)
  }

  deleteUser(id: number): Observable<boolean> {
    return this.httpSrvc.delete<boolean>(USERS_URL + id)
  }
}
