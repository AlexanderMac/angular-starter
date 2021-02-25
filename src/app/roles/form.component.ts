import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { NotificationService } from '../_core/notification.service'
import { RoleService } from './service'
import { Role } from './model'

@Component({
  selector: 'am-role-form',
  template: require('./form.component.pug')
})
export class RoleFormComponent implements OnInit, OnDestroy {
  isLoading: boolean
  isSaving: boolean
  roleId: number
  role: Role
  subscriptions = new Subscription()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private roleSrvc: RoleService
  ) {
    this.roleId = +this.activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    if (!this.roleId) {
      this.role = new Role()
    } else {
      this.loadRole()
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
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
    this.subscriptions.add(subscription)
  }

  saveRole(): void {
    this.isSaving = true
    let fn = this.roleId ? 'updateRole' : 'createRole'
    let subscription = this.roleSrvc[fn](this.role)
      .pipe(
        finalize(() => this.isSaving = false)
      )
      .subscribe(
        () => {
          this.ntfsSrvc.info(`Role ${this.roleId ? 'updated' : 'created'} successfully`)
          this.router.navigate(['/roles'])
        },
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to save role', err)
      )
    this.subscriptions.add(subscription)
  }
}
