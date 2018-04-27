import { NgModule }          from '@angular/core';
import { RouterModule }      from '@angular/router';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { NavbarComponent }   from './navbar.component';
import { SpinnerComponent }  from './spinner.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
