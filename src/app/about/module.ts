import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@shared/module'
import { AboutMainComponent } from './main.component'

@NgModule({
  declarations: [AboutMainComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: 'about', component: AboutMainComponent }])],
})
export class AboutModule {}
