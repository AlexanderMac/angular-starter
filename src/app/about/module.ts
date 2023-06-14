import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { AboutMainComponent } from '@app/about/main.component'
import { SharedModule } from '@shared/module'

@NgModule({
  declarations: [AboutMainComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: 'about', component: AboutMainComponent }])],
})
export class AboutModule {}
