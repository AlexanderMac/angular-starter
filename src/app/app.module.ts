import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { AboutModule } from '@app/about/module'
import { AppComponent } from '@app/app.component'
import { HomeModule } from '@app/home/module'
import { UsersModule } from '@app/users/module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404' },
    ]),
    HomeModule,
    UsersModule,
    AboutModule,
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
