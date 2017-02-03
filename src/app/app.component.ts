import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  	<h1>Tic Tac Toe</h1>
  	<app-game></app-game>
  `,
  styles: [`h1 { text-align: center; }`]
})
export class AppComponent { }