import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService }    from '../_core/notification.service';
import { UserService }            from './service';
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
    private userSrvc: UserService) {
      this.userId = +this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this._loadUser();
  }

  _loadUser() {
    this.isLoading = true;
    return this.userSrvc
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
