import { Component } from '@angular/core';
import { routerTransition } from './router.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routerTransition ],
  
})
export class AppComponent {
  title = 'app';

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
