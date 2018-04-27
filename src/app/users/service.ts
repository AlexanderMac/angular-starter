import { Injectable }        from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { MemoryRepoService } from '../_core/memory-repo.service';
import { User }              from './model';

@Injectable()
export class UserService {
  constructor(private memoryRepoSrvc: MemoryRepoService) {}

  getUser(id: number): Observable<User> {
    return this.memoryRepoSrvc.getOne(id);
  }

  getUsers(): Observable<User[]> {
    return this.memoryRepoSrvc.getList();
  }

  createUser(user: User): Observable<User> {
    return this.memoryRepoSrvc.create(user);
  }

  updateUser(userData: any): Observable<User> {
    return this.memoryRepoSrvc.update(userData);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.memoryRepoSrvc.delete(id);
  }
}
