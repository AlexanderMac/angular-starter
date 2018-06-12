import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService }    from '../_core/notification.service';
import { UserService }            from './service';
import { RoleService }            from '../roles/service';
import { User }                   from './model';

@Component({
  selector: 'am-user-details',
  templateUrl: './details.component.pug'
})
export class UserDetailsComponent implements OnInit {
  isLoading: boolean;
  isSaving: boolean;
  userId: number;
  user: User;

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
    /* TODO: RolesCRUD:
    this.isLoading = true;
    return this.ngQSrvc
      .all([
        this.roleSrvc.getRoles(),
        this.userSrvc.getUser(this.userId)
      ])
      .then(([roles, user]) => {
        user.roles = _.chain(user.roles)
          .map(userRoleId => _.find(roles, { id: +userRoleId }))
          .map(role => role ? role.name : '')
          .compact()
          .join(',')
          .value();
        this.user = user;
      })
      .catch(err => {
        this.notificationSrvc.error(err, 'Unable to load user');
        this.ngLocationSrvc.path('/users');
      })
      .finally(() => this.isLoading = false);
    */
    this.isLoading = true;
    this.userSrvc
      .getUser(this.userId)
      .subscribe(
        user => this.user = user,
        err => {
          this.ntfsSrvc.error('Unable to load user');
          this.router.navigate(['/users']);
       },
       () => this.isLoading = false
    );
  }
}
