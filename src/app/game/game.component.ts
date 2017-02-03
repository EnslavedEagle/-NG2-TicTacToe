import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  template: `
  	<div>
  		<p><b>Game Token:</b> <strong *ngIf="gameToken">{{gameToken}}</strong></p>
  		<p>Answer from API:</p>
  		<button (click)="checkGameStatus()">
  			Check status
  		</button>
  	</div>
  `,
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	apiResponse: Promise<any>;
	gameToken: string;
	board: any[];
	player: any;
	winner: any;

	constructor(private game: GameService) { }

	ngOnInit() {
		this.game.startGame()
			.subscribe(
				response => {
					this.gameToken = response.token;
					this.board = response.game.board;
					this.player = response.game.player;
					this.winner = response.game.winner;

					this.saveState({
						gameToken: this.gameToken,
						board: this.board,
						player: this.player,
						winner: this.winner
					})
				},
				error => console.log(error)
			);
	}

	checkGameStatus() {
		this.game.getStatus()
			.subscribe(
				response => {
					this.board = response.game.board;
					this.player = response.game.player;
					this.winner = response.game.winner;
				},
				error => console.log(error)
			);
	}

	saveState(gameState: any) {
		localStorage.setItem('gameData', JSON.stringify({
			gameToken: gameState.gameToken || '',
			board: gameState.board || [],
			player: gameState.player || '',
			winner: gameState.winner || null
		}));
	}

	loadState() {
		var game = JSON.parse(localStorage.getItem('gameData'));
		if(game !== undefined) {
			this.gameToken = game.gameToken;
			this.board = game.board;
			this.player = game.player;
			this.winner = game.winner;
		}
	}

}
