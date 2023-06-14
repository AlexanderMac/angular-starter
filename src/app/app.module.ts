import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { AppComponent } from '@app/app.component'
import { UsersModule } from '@app/users/module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/users', pathMatch: 'full' },
      { path: '**', redirectTo: '/404' },
    ]),
    UsersModule,
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
