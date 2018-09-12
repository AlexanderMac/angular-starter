import { NgModule }          from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { FormsModule }       from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';
import { NavbarComponent }   from './navbar.component';
import { SpinnerComponent }  from './spinner.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NavbarComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
