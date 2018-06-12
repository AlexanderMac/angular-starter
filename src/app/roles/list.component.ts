import * as _                  from 'lodash';
import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';
import { NotificationService } from '../_core/notification.service';
import { RoleService }         from './service';
import { Role }                from './model';

@Component({
  selector: 'am-role-list',
  template: require('./list.component.pug')
})
export class RoleListComponent implements OnInit {
  isLoading: boolean;
  isSaving: boolean;
  roles: Role[];

  constructor(
    private router: Router,
    private ntfsSrvc: NotificationService,
    private roleSrvc: RoleService) {
  }

  ngOnInit(): void {
    this._loadRoles();
  }

  _loadRoles(): void {
    this.isLoading = true;
    this.roleSrvc
      .getRoles()
      .subscribe(
        roles => this.roles = roles,
        () => this.ntfsSrvc.error('Unable to load roles'),
        () => this.isLoading = false
      );
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
    this.roleSrvc
      .deleteRole(role.id)
      .subscribe(
        () => {
          _.remove(this.roles, role);
          this.ntfsSrvc.info('Role deleted successfully');
        },
        () => this.ntfsSrvc.error('Unable to delete role'),
        () => this.isSaving = false);
  }
}
