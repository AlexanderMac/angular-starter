import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../_core/module';
import { SharedModule } from '../_shared/module';
import { RoleListComponent } from './list.component';
import { RoleFormComponent } from './form.component';
import { RoleDetailsComponent } from './details.component';
import { RoleMultiselectorComponent } from './multiselector.component';
import { RoleService } from './service';
import { RoleLocalStrgService } from './service/local-storage';
import { RoleHttpService } from './service/http';

import './styles.styl';

@NgModule({
  declarations: [
    RoleListComponent,
    RoleFormComponent,
    RoleDetailsComponent,
    RoleMultiselectorComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'roles', component: RoleListComponent },
      { path: 'roles/new', component: RoleFormComponent },
      { path: 'roles/:id/edit', component: RoleFormComponent },
      { path: 'roles/:id', component: RoleDetailsComponent }
    ])
  ],
  exports: [
    RoleMultiselectorComponent
  ],
  providers: [
    RoleService,
    RoleLocalStrgService,
    RoleHttpService
  ]
})
export class RolesModule { }
