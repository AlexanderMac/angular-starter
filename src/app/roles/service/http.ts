import { Injectable }  from '@angular/core';
import { HttpClient,
         HttpHeaders } from '@angular/common/http';
import { Observable }  from 'rxjs/Observable';
import { Role }        from '../model';

const USERS_URL = '/roles/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RoleHttpService {
  constructor(private httpSrvc: HttpClient) {}

  getRole(id: number): Observable<Role> {
    return this.httpSrvc.get<Role>(USERS_URL + id);
  }

  getRoles(): Observable<Role[]> {
    return this.httpSrvc.get<Role[]>(USERS_URL);
  }

  createRole(role: Role): Observable<Role> {
    return this.httpSrvc.post<Role>(USERS_URL, role, HTTP_OPTIONS);
  }

  updateRole(roleData: any): Observable<Role> {
    return this.httpSrvc.put<Role>(USERS_URL + roleData.id, roleData, HTTP_OPTIONS);
  }

  deleteRole(id: number): Observable<boolean> {
    return this.httpSrvc.delete<boolean>(USERS_URL + id);
  }
}
