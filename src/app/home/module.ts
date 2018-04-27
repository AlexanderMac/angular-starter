import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { SharedModule }  from '../_shared/module';
import { HomeComponent } from './component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent }
    ])
  ]
})
export class HomeModule { }
