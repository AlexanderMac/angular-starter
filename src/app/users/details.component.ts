import * as _                     from 'lodash';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin }               from 'rxjs/observable/forkJoin';
import { NotificationService }    from '../_core/notification.service';
import { UserService }            from './service';
import { RoleService }            from '../roles/service';
import { User }                   from './model';

class UserEx extends User {
  rolesStr: string;
}

@Component({
  selector: 'am-user-details',
  templateUrl: './details.component.pug'
})
export class UserDetailsComponent implements OnInit {
  isLoading: boolean;
  isSaving: boolean;
  userId: number;
  user: UserEx;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ntfsSrvc: NotificationService,
    private userSrvc: UserService,
    private roleSrvc: RoleService) {
      this.userId = +this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this._loadUser();
  }

  _loadUser(): void {
    this.isLoading = true;
    forkJoin(
      this.roleSrvc.getRoles(),
      this.userSrvc.getUser(this.userId)
    )
    .subscribe(
      ([roles, user]) => {
        this.user = (user as UserEx);
        this.user.rolesStr = _.chain(user.roles)
          .map(userRoleId => _.find(roles, { id: +userRoleId }))
          .map(role => role ? role.name : '')
          .compact()
          .join(',')
          .value();
      },
      err => {
        this.ntfsSrvc.error('Unable to load user');
        this.router.navigate(['/users']);
      },
      () => this.isLoading = false
    );
  }
}
