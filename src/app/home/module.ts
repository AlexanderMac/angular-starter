import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { HomeComponent } from '@app/home/home.component'
import { NotFoundComponent } from '@app/home/not-found.component'
import { SharedModule } from '@shared/module'

@NgModule({
  declarations: [HomeComponent, NotFoundComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent },
      { path: '404', component: NotFoundComponent },
    ]),
  ],
})
export class HomeModule {}
