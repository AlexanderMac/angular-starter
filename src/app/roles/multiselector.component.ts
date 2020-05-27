import * as _ from 'lodash';
import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Input,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoleService } from './service';
import { Role } from './model';

@Component({
  selector: 'am-role-multiselector',
  template: require('./multiselector.component.pug')
})
export class RoleMultiselectorComponent implements OnInit, OnDestroy {
  roles: Role[];
  selectedRoles = {};
  isNoRoleSelected = true;
  subscriptions = new Subscription();

  @Input() initialRoles: number[];

  @Output() rolesChanged = new EventEmitter();

  constructor(private roleSrvc: RoleService) {}

  ngOnInit(): void {
    this._loadRoles();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _loadRoles(): void {
    let subscription = this.roleSrvc
      .getRoles()
      .subscribe(
        roles => {
          this.roles = roles;
          this.selectedRoles = _.reduce(this.roles, (res, role) => {
            res[role.id] = _.includes(this.initialRoles, role.id);
            return res;
          }, {});
          this.isNoRoleSelected = _.isEmpty(this.selectedRoles);
        }
      );
    this.subscriptions.add(subscription);
  }

  rolesChange(): void {
    let roles = _.chain(this.selectedRoles)
      .keys()
      .filter(roleId => this.selectedRoles[roleId])
      .value();
    this.isNoRoleSelected = roles.length === 0;
    this.rolesChanged.emit(roles);
  }
}
