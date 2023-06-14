import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Task } from '@app/tasks/model'
import { TaskHttpService } from '@app/tasks/service/http'
import { TaskLocalStorageService } from '@app/tasks/service/local-storage'
import { environment } from '@env/environment'

@Injectable()
export class TaskService {
  private repoSrvc: TaskLocalStorageService | TaskHttpService

  constructor(ls: TaskLocalStorageService, http: TaskHttpService) {
    this.repoSrvc = environment.sourceType === 'local-storage' ? ls : http
  }

  getTask(id: number): Observable<Task> {
    return this.repoSrvc.getTask(id)
  }

  getTasks(): Observable<Task[]> {
    return this.repoSrvc.getTasks()
  }

  createTask(taskData: Task): Observable<Task> {
    return this.repoSrvc.createTask(taskData)
  }

  updateTask(taskData: Task): Observable<Task> {
    return this.repoSrvc.updateTask(taskData)
  }

  deleteTask(id: number): Observable<boolean> {
    return this.repoSrvc.deleteTask(id)
  }
}
