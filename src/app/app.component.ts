import { Component } from '@angular/core';
@Component({
  selector: 'home',
  template: `
     <h1>
          <a href="https://docs.google.com/a/pixka.me/document/d/1i3ii-I6MxpjXDU5Zo1Pb4CI4qfdlTYybeVLrciNPpyg/edit?usp=sharing"
          target="_blank" i18n>Help</a>
        </h1>
  `
})
export class Home { }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
