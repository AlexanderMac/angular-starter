import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { User } from '../model'

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

  createUser(user: User): Observable<User> {
    return this.httpSrvc.post<User>(USERS_URL, user)
  }

  updateUser(userData: any): Observable<User> {
    return this.httpSrvc.put<User>(USERS_URL + userData.id, userData)
  }

  deleteUser(id: number): Observable<boolean> {
    return this.httpSrvc.delete<boolean>(USERS_URL + id)
  }
}
