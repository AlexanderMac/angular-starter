import { Component } from '@angular/core'

import { environment } from '@env/environment'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.pug',
  styleUrls: ['./about.component.sass'],
})
export class AboutMainComponent {
  production = environment.production
  version = environment.version
  sourceType = environment.sourceType
}
