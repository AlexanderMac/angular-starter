import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { Task } from '@app/tasks/model'
import { TaskService } from '@app/tasks/service'
import { NotificationService } from '@core/notification.service'

@Component({
  selector: 'app-task-form',
  templateUrl: './form.component.pug',
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskId: number
  task: Task | undefined
  isLoading = false
  isSaving = false
  private subscriptions = new Subscription()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private taskSrvc: TaskService,
  ) {
    this.taskId = +this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    if (!this.taskId) {
      this.task = {} as Task
    } else {
      this.loadTask()
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  loadTask(): void {
    this.isLoading = true
    const subscription = this.taskSrvc
      .getTask(this.taskId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (task: Task) => (this.task = task),
        error: (err: Error) => {
          this.ntfsSrvc.warningOrError('Unable to load task', err)
          this.router.navigate(['/tasks'])
        },
      })
    this.subscriptions.add(subscription)
  }

  saveTask(): void {
    this.isSaving = true
    const fn = this.taskId ? this.taskSrvc.updateTask(this.task!) : this.taskSrvc.createTask(this.task!)
    const subscription = fn.pipe(finalize(() => (this.isSaving = false))).subscribe({
      next: () => {
        this.ntfsSrvc.info(`Task ${this.taskId ? 'updated' : 'created'} successfully`)
        this.router.navigate(['/tasks'])
      },
      error: (err: Error) => this.ntfsSrvc.warningOrError('Unable to save task', err),
    })
    this.subscriptions.add(subscription)
  }
}
