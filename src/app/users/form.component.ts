import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { User } from '@app/users/model'
import { UserService } from '@app/users/service'
import { NotificationService } from '@core/notification.service'

@Component({
  selector: 'app-user-form',
  templateUrl: './form.component.pug',
  styleUrls: ['./form.component.sass'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  userId: number
  user: User | undefined
  isLoading = false
  isSaving = false
  private subscriptions = new Subscription()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private userSrvc: UserService,
  ) {
    this.userId = +this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.user = {} as User
    } else {
      this.loadUser()
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  loadUser(): void {
    this.isLoading = true
    const subscription = this.userSrvc
      .getUser(this.userId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (user: User) => (this.user = user),
        error: (err: Error) => {
          this.ntfsSrvc.warningOrError('Unable to load user', err)
          this.router.navigate(['/users'])
        },
      })
    this.subscriptions.add(subscription)
  }

  saveUser(): void {
    this.isSaving = true
    const fn = this.userId ? this.userSrvc.updateUser(this.user!) : this.userSrvc.createUser(this.user!)
    const subscription = fn.pipe(finalize(() => (this.isSaving = false))).subscribe({
      next: () => {
        this.ntfsSrvc.info(`User ${this.userId ? 'updated' : 'created'} successfully`)
        this.router.navigate(['/users'])
      },
      error: (err: Error) => this.ntfsSrvc.warningOrError('Unable to save user', err),
    })
    this.subscriptions.add(subscription)
  }
}
