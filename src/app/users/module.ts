import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@shared/module'
import { UserListComponent } from './list.component'
import { UserFormComponent } from './form.component'
import { UserDetailsComponent } from './details.component'
import { UserService } from './service'
import { UserLocalStrgService } from './service/local-storage'
import { UserHttpService } from './service/http'

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/:id/edit', component: UserFormComponent },
      { path: 'users/:id', component: UserDetailsComponent }
    ])
  ],
  providers: [
    UserService,
    UserLocalStrgService,
    UserHttpService
  ]
})
export class UsersModule { }
