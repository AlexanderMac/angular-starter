import { Component } from '@angular/core';

@Component({
  selector: 'as-app',
  template: require('./app.pug'),
  styles: [require('./app.component.css')]
})
export class AppComponent {
  click() {
    console.log('Button clicked');
  }
}
