import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_shared/module';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent },
      { path: '404', component: NotFoundComponent }
    ])
  ]
})
export class HomeModule { }
