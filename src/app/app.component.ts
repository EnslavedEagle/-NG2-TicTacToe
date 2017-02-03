import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  	<h1>Tic Tac Toe</h1>
  	<app-game></app-game>
  	<div class="links">
  		<ul>
  			<li>
  				<a title="See GitHub repository for this project"
  					href="https://github.com/EnslavedEagle/-NG2-TicTacToe"
  					target="_blank">
	  				<span class="fa fa-github"></span>
	  			</a>
  			</li>
  			<li>
  				<a title="See author's website"
  					href="http://www.patrykb.pl/"
  					target="_blank">
  					<span class="fa fa-globe"></span>
  				</a>
  			</li>
  		</ul>
  	</div>
  `,
  styles: [`
  	h1 { text-align: center; }
  	a {
  		color: #212121;
  		text-decoration: none;
  	}
  	a:hover {
  		color: #757575;
  	}

  	.links ul {
  		margin: 10px auto;
  		width: 100%;
  		max-width: 450px;
  		text-align: center;
  		padding: 0;
  	}
  	.links ul li {
  		display: inline-block;
  		margin: 0 5px;
  		text-align: center;
  	}
  	.links li a {
  		text-decoration: none;
  		font-size: 1.7em;
  	}
  	.links p {
  		font-size: .9em;
  		text-align: center;
  	}
  	.links p a {
  		color: #555;
  	}
  `]
})
export class AppComponent { }