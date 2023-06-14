import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { remove } from 'lodash'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { User } from '@app/users/model'
import { UserService } from '@app/users/service'
import { NotificationService } from '@core/notification.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.sass'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users!: User[]
  isLoading = false
  isSaving = false
  private subscriptions = new Subscription()

  constructor(private router: Router, private ntfsSrvc: NotificationService, private userSrvc: UserService) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  loadUsers(): void {
    this.isLoading = true
    const subscription = this.userSrvc
      .getUsers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (users: User[]) => (this.users = users),
        error: (err: Error) => this.ntfsSrvc.warningOrError('Unable to load users', err),
      })
    this.subscriptions.add(subscription)
  }

  userDetails(user: User): void {
    this.router.navigate(['/users', user.id])
  }

  editUser(user: User): void {
    this.router.navigate(['/users/:id/edit', { id: user.id }])
  }

  deleteUser(user: User): void {
    const res = confirm(`Delete ${user.name}? The user will be permanently deleted.`)
    if (!res) {
      return
    }

    this.isSaving = true
    const subscription = this.userSrvc
      .deleteUser(user.id)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe(
        () => {
          remove(this.users, user)
          this.ntfsSrvc.info('User deleted successfully')
        },
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to delete user', err),
      )
    this.subscriptions.add(subscription)
  }
}
