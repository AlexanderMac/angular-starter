import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { CoreModule } from '@core/module'
import { AboutMainComponent } from '@shared/about.component'
import { NavbarComponent } from '@shared/navbar.component'
import { NotFoundComponent } from '@shared/not-found.component'
import { SpinnerComponent } from '@shared/spinner.component'

@NgModule({
  declarations: [NavbarComponent, SpinnerComponent, AboutMainComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'about', component: AboutMainComponent },
      { path: '404', component: NotFoundComponent },
    ]),
    FormsModule,
    CoreModule,
  ],
  exports: [CommonModule, RouterModule, FormsModule, HttpClientModule, CoreModule, NavbarComponent, SpinnerComponent],
})
export class SharedModule {}
