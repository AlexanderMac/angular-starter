import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription, forkJoin } from 'rxjs'
import { finalize } from 'rxjs/operators'
import * as _ from 'lodash'
import { NotificationService } from '../_core/notification.service'
import { UserService } from './service'
import { RoleService } from '../roles/service'
import { User } from './model'

class UserEx extends User {
  rolesStr: string
}

@Component({
  selector: 'am-user-details',
  template: require('./details.component.pug')
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  isLoading: boolean
  isSaving: boolean
  userId: number
  user: UserEx
  subscriptions = new Subscription()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private userSrvc: UserService,
    private roleSrvc: RoleService
  ) {
    this.userId = +this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    this.loadUser()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  loadUser(): void {
    this.isLoading = true
    let subscription = forkJoin(
      this.roleSrvc.getRoles(),
      this.userSrvc.getUser(this.userId)
    )
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        ([roles, user]) => {
          this.user = user as UserEx
          this.user.rolesStr = _.chain(user.roles)
            .map(userRoleId => _.find(roles, { id: +userRoleId }))
            .map(role => role ? role.name : '')
            .compact()
            .join(',')
            .value()
        },
        (err: Error) => {
          this.ntfsSrvc.warningOrError('Unable to load user', err)
          this.router.navigate(['/users'])
        }
      )
    this.subscriptions.add(subscription)
  }
}
