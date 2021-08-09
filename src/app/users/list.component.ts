import * as _ from 'lodash'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { NotificationService } from '../_core/notification.service'
import { UserService } from './service'
import { User } from './model'

@Component({
  selector: 'am-user-list',
  template: require('./list.component.pug')
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[]
  isLoading: boolean
  isSaving: boolean
  private _subscriptions = new Subscription()

  constructor(
    private router: Router,
    private ntfsSrvc: NotificationService,
    private userSrvc: UserService) {
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
  }

  loadUsers(): void {
    this.isLoading = true
    let subscription = this.userSrvc
      .getUsers()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (users: User[]) => this.users = users,
        error: (err: Error) => this.ntfsSrvc.warningOrError('Unable to load users', err)
      })
    this._subscriptions.add(subscription)
  }

  userDetails(user: User): void {
    this.router.navigate(['/users', user.id])
  }

  editUser(user: User): void {
    this.router.navigate(['/users/:id/edit', { id: user.id }])
  }

  deleteUser(user: User): void {
    let res = confirm(`Delete ${user.name}? The user will be permanently deleted.`)
    if (!res) {
      return
    }

    this.isSaving = true
    let subscription = this.userSrvc
      .deleteUser(user.id)
      .pipe(
        finalize(() => this.isSaving = false)
      )
      .subscribe(
        () => {
          _.remove(this.users, user)
          this.ntfsSrvc.info('User deleted successfully')
        },
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to delete user', err)
      )
    this._subscriptions.add(subscription)
  }
}
