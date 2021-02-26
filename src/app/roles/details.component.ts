import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { NotificationService } from '../_core/notification.service'
import { RoleService } from './service'
import { Role } from './model'

@Component({
  selector: 'am-role-details',
  template: require('./details.component.pug')
})
export class RoleDetailsComponent implements OnInit, OnDestroy {
  roleId: number
  role: Role
  isLoading: boolean
  isSaving: boolean
  private _subscriptions = new Subscription()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private roleSrvc: RoleService
  ) {
    this.roleId = +this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    this.loadRole()
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
  }

  loadRole(): void {
    this.isLoading = true
    let subscription = this.roleSrvc
      .getRole(this.roleId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        role => this.role = role,
        (err: Error) => {
          this.ntfsSrvc.warningOrError('Unable to load role', err)
          this.router.navigate(['/roles'])
        }
      )
    this._subscriptions.add(subscription)
  }
}
