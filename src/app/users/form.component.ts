import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { NotificationService } from '@core/notification.service'
import { UserService } from './service'
import { User } from './model'

@Component({
  selector: 'app-user-form',
  templateUrl: './form.component.pug',
  styleUrls: ['./form.component.styl']
})
export class UserFormComponent implements OnInit, OnDestroy {
  userId: number
  user: User | undefined
  isLoading = false
  isSaving = false
  private _subscriptions = new Subscription()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private userSrvc: UserService
  ) {
    this.userId = +this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.user = new User()
    } else {
      this.loadUser()
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
  }

  loadUser(): void {
    this.isLoading = true
    let subscription = this.userSrvc
      .getUser(this.userId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (user: User) => this.user = user,
        error: (err: Error) => {
          this.ntfsSrvc.warningOrError('Unable to load user', err)
          this.router.navigate(['/users'])
        }
      })
    this._subscriptions.add(subscription)
  }

  saveUser(): void {
    this.isSaving = true
    let fn = this.userId ?
      this.userSrvc.updateUser :
      this.userSrvc.createUser
    let subscription = fn.call(this.userSrvc, this.user)
      .pipe(
        finalize(() => this.isSaving = false)
      )
      .subscribe(
        () => {
          this.ntfsSrvc.info(`User ${this.userId ? 'updated' : 'created'} successfully`)
          this.router.navigate(['/users'])
        },
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to save user', err)
      )
    this._subscriptions.add(subscription)
  }
}
