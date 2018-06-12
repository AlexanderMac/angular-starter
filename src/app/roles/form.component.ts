import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService }    from '../_core/notification.service';
import { RoleService }            from './service';
import { Role }                   from './model';

@Component({
  selector: 'am-role-form',
  templateUrl: './form.component.pug'
})
export class RoleFormComponent implements OnInit {
  isLoading: boolean;
  isSaving: boolean;
  roleId: number;
  role: Role;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private roleSrvc: RoleService) {
    this.roleId = +this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    if (!this.roleId) {
      this.role = new Role();
    } else {
      this._loadRole();
    }
  }

  _loadRole(): void {
    this.isLoading = true;
    this.roleSrvc
      .getRole(this.roleId)
      .subscribe(
        role => this.role = role,
        err => {
          this.ntfsSrvc.error('Unable to load role');
          this.router.navigate(['/roles']);
        },
        () => this.isLoading = false
      );
  }

  saveRole(): void {
    this.isSaving = true;
    let fn = this.roleId ? 'updateRole' : 'createRole';
    this.roleSrvc[fn](this.role)
      .subscribe(
        () => {
          this.ntfsSrvc.info(`Role ${this.roleId ? 'updated' : 'created'} successfully`);
          this.router.navigate(['/roles']);
        },
        () => this.ntfsSrvc.error('Unable to save role'),
        () => this.isSaving = false
      );
  }
}
