import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { remove } from 'lodash'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { Task } from '@app/tasks/model'
import { TaskService } from '@app/tasks/service'
import { NotificationService } from '@core/notification.service'

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.sass'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks!: Task[]
  isLoading = false
  isSaving = false
  private subscriptions = new Subscription()

  constructor(private router: Router, private ntfsSrvc: NotificationService, private taskSrvc: TaskService) {}

  ngOnInit(): void {
    this.loadTasks()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  loadTasks(): void {
    this.isLoading = true
    const subscription = this.taskSrvc
      .getTasks()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (tasks: Task[]) => (this.tasks = tasks),
        error: (err: Error) => this.ntfsSrvc.warningOrError('Unable to load tasks', err),
      })
    this.subscriptions.add(subscription)
  }

  taskDetails(task: Task): void {
    this.router.navigate(['/tasks', task.id])
  }

  editTask(task: Task): void {
    this.router.navigate(['/tasks/:id/edit', { id: task.id }])
  }

  deleteTask(task: Task): void {
    const res = confirm(`Delete ${task.name}? The task will be permanently deleted.`)
    if (!res) {
      return
    }

    this.isSaving = true
    const subscription = this.taskSrvc
      .deleteTask(task.id)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe(
        () => {
          remove(this.tasks, task)
          this.ntfsSrvc.info('Task deleted successfully')
        },
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to delete task', err),
      )
    this.subscriptions.add(subscription)
  }
}
