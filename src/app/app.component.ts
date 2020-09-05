import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';
  options = {
    position: ['bottom', 'center'],
    animate: 'fromBottom'
  };

  constructor() {
  }

}
