import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { Task } from '@app/tasks/model'
import { TaskService } from '@app/tasks/service'
import { NotificationService } from '@core/notification.service'

@Component({
  selector: 'app-task-details',
  templateUrl: './details.component.pug',
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
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
    this.loadTask()
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
}
