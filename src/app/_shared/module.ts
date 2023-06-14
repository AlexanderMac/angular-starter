import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { CoreModule } from '@core/module'
import { NavbarComponent } from '@shared/navbar.component'
import { SpinnerComponent } from '@shared/spinner.component'

@NgModule({
  declarations: [NavbarComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule, FormsModule, CoreModule],
  exports: [CommonModule, RouterModule, FormsModule, HttpClientModule, CoreModule, NavbarComponent, SpinnerComponent],
})
export class SharedModule {}
