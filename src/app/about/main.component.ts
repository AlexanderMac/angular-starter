import { Component, OnInit } from '@angular/core'

import { environment } from '@env/environment'

@Component({
  selector: 'app-about',
  templateUrl: './main.component.pug',
  styleUrls: ['./main.component.sass'],
})
export class AboutMainComponent implements OnInit {
  production = false
  version = ''
  sourceType = ''

  ngOnInit(): void {
    this.production = environment.production
    this.version = environment.version
    this.sourceType = environment.sourceType
  }
}
