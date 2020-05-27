import * as _ from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../_core/notification.service';
import { RoleService } from './service';
import { Role } from './model';

@Component({
  selector: 'am-role-list',
  template: require('./list.component.pug')
})
export class RoleListComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  isSaving: boolean;
  roles: Role[];
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private ntfsSrvc: NotificationService,
    private roleSrvc: RoleService) {
  }

  ngOnInit(): void {
    this._loadRoles();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  _loadRoles(): void {
    this.isLoading = true;
    let subscription = this.roleSrvc
      .getRoles()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        roles => this.roles = roles,
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to load roles', err)
      );
    this.subscriptions.add(subscription);
  }

  roleDetails(role: Role): void {
    this.router.navigate(['/roles', role.id]);
  }

  editRole(role: Role): void {
    this.router.navigate(['/roles/:id/edit', { id: role.id }]);
  }

  deleteRole(role: Role): void {
    let res = confirm(`Delete ${role.name}? The role will be permanently deleted.`);
    if (!res) {
      return;
    }

    this.isSaving = true;
    let subscription = this.roleSrvc
      .deleteRole(role.id)
      .pipe(
        finalize(() => this.isSaving = false)
      )
      .subscribe(
        () => {
          _.remove(this.roles, role);
          this.ntfsSrvc.info('Role deleted successfully');
        },
        (err: Error) => this.ntfsSrvc.warningOrError('Unable to delete role', err)
      );
    this.subscriptions.add(subscription);
  }
}
