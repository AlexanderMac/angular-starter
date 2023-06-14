import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { User } from '@app/users/model'
import { UserService } from '@app/users/service'
import { NotificationService } from '@core/notification.service'

@Component({
  selector: 'app-user-details',
  templateUrl: './details.component.pug',
  styleUrls: ['./details.component.sass'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userId: number
  user: User | undefined
  isLoading = false
  isSaving = false
  private _subscriptions = new Subscription()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private userSrvc: UserService,
  ) {
    this.userId = +this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    this.loadUser()
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
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
    this._subscriptions.add(subscription)
  }
}
