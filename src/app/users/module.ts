import { NgModule }             from '@angular/core';
import { RouterModule }         from '@angular/router';
import { CoreModule }           from '../_core/module';
import { SharedModule }         from '../_shared/module';
import { UserListComponent }    from './list.component';
import { UserFormComponent }    from './form.component';
import { UserDetailsComponent } from './details.component';
import { UserService }          from './service';

import './styles.styl';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserDetailsComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'users',   component: UserListComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/:id/edit', component: UserFormComponent },
      { path: 'users/:id', component: UserDetailsComponent }
    ]),
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
