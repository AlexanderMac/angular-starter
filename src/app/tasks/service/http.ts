import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Task } from '@app/tasks/model'

const TASKS_URL = '/tasks/'

@Injectable()
export class TaskHttpService {
  constructor(private httpSrvc: HttpClient) {}

  getTask(id: number): Observable<Task> {
    return this.httpSrvc.get<Task>(TASKS_URL + id)
  }

  getTasks(): Observable<Task[]> {
    return this.httpSrvc.get<Task[]>(TASKS_URL)
  }

  createTask(taskData: Task): Observable<Task> {
    return this.httpSrvc.post<Task>(TASKS_URL, taskData)
  }

  updateTask(taskData: Task): Observable<Task> {
    return this.httpSrvc.put<Task>(TASKS_URL + taskData.id, taskData)
  }

  deleteTask(id: number): Observable<boolean> {
    return this.httpSrvc.delete<boolean>(TASKS_URL + id)
  }
}
