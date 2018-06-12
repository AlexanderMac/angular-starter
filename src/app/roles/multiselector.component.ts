import * as _          from 'lodash';
import { Component,
        OnInit,
        EventEmitter } from '@angular/core';
import { RoleService } from './service';
import { Role }        from './model';

@Component({
  selector: 'am-role-multiselector',
  templateUrl: './multiselector.component.pug',
  inputs: ['initialRoles'],
  outputs: ['changeRoles']
})
export class RoleMultiselectorComponent implements OnInit {
  roles: Role[];
  selectedRoles = {};
  isNoRoleSelected = true;
  initialRoles: number[];
  changeRoles = new EventEmitter();

  constructor(private roleSrvc: RoleService) {}

  ngOnInit(): void {
    this._loadRoles();
  }

  _loadRoles(): void {
    this.roleSrvc
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
  }

  rolesChange(): void {
    let roles = _.chain(this.selectedRoles)
      .keys()
      .filter(roleId => this.selectedRoles[roleId])
      .value();
    this.isNoRoleSelected = roles.length === 0;
    this.changeRoles.emit(roles);
  }
}
