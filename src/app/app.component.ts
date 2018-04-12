import { Component, Inject } from '@angular/core';
// import { AjsProvider } from '../core/ajs-providers';

@Component({
  selector: 'dp-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(@Inject('$state') private $state: any) {
    console.log($state);
  }
}
