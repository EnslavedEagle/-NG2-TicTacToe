import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  	<h1>Tic Tac Toe</h1>
  	<p>With your server</p>
  	<app-game></app-game>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
