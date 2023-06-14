import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { UserDetailsComponent } from '@app/users/details.component'
import { UserFormComponent } from '@app/users/form.component'
import { UserListComponent } from '@app/users/list.component'
import { UserService } from '@app/users/service'
import { UserHttpService } from '@app/users/service/http'
import { UserLocalStorageService } from '@app/users/service/local-storage'
import { SharedModule } from '@shared/module'

@NgModule({
  declarations: [UserListComponent, UserFormComponent, UserDetailsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/:id/edit', component: UserFormComponent },
      { path: 'users/:id', component: UserDetailsComponent },
    ]),
  ],
  providers: [UserService, UserLocalStorageService, UserHttpService],
})
export class UsersModule {}
