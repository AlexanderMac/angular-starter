import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Task } from '@app/tasks/model'
import { LocalStorageRepoService, LocalStorageRepoServiceFactory } from '@core/localstorage-repo.service'

@Injectable()
export class TaskLocalStorageService {
  private repoSrvc: LocalStorageRepoService<Task>

  constructor(factory: LocalStorageRepoServiceFactory) {
    this.repoSrvc = factory.getInstance()
    this.repoSrvc.init('Tasks')
  }

  getTask(id: number): Observable<Task> {
    return this.repoSrvc.getOne(id)
  }

  getTasks(): Observable<Task[]> {
    return this.repoSrvc.getList()
  }

  createTask(taskData: Task): Observable<Task> {
    return this.repoSrvc.create(taskData)
  }

  updateTask(taskData: Task): Observable<Task> {
    return this.repoSrvc.update(taskData)
  }

  deleteTask(id: number): Observable<boolean> {
    return this.repoSrvc.delete(id)
  }
}
