import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game';

@Component({
  selector: 'app-game',
  template: `
  	<div>
  		<div class="info">
	  		<div class="gameOver" *ngIf="outcome !== null">
				<div class="outcome">
					Game is over! {{outcome}}
				</div>
		  	</div>
		  	<div class="error" *ngIf="error">
		  		<p>{{error}}</p>
		  	</div>
		  	<div class="buttons" *ngIf="outcome !== null || token === undefined">
				<button (click)="restartGame(true)">I want to start</button>
				<button (click)="restartGame(false)">I want the Bot to start</button>
			</div>
	  		<div class="turn" *ngIf="whoseTurn !== null">{{whoseTurn}}'s Turn</div>
	  	</div>
  		<app-board
  			*ngIf="token !== undefined"
  			[board]="board"
  			(userMove)="handleUserMove($event)">
  		</app-board>
  	</div>
  `,
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	@Input() userStarts;

	apiResponse: Promise<any>;
	token: string;
	board: any[];
	player: any;
	winner: any;
	outcome: string = null;
	whoseTurn: string = 'Player';
	error: string;

	constructor(private game: GameService) { }

	ngOnInit() {
		this.initGame();
	}

	handleResponse(res): void {
		this.error = null;
		this.token = res.token || this.token;
		this.game.saveToken(this.token);
		this.board = res.game.board || this.board;
		this.player = res.game.player || this.player;
		this.winner = res.game.winner;

		this.whoseTurn = 'Player';
		this.checkWinner();
	}

	handleError(error): void {
		this.error = 'Error: ' + error;
	}

	initGame() {
		this.game.initGame()
			.subscribe(
				response => this.handleResponse(response),
				error => this.handleError(error)
			);
	}

	// Reset the outcome and re-init the game.
	restartGame(userStarts) {
		this.outcome = null;
		this.game.startNewGame(userStarts)
			.subscribe(
				response => this.handleResponse(response),
				error => this.handleError(error)
			);
	}

	// Refresh the game data from the API
	checkGameStatus() {
		this.game.getStatus(this.token)
			.subscribe(
				response => this.handleResponse(response),
				error => this.handleError(error)
			);
	}

	// Let the server know that the user made a move
	handleUserMove(move) {
		if(this.canPlayerDoAnything()) {
			this.whoseTurn = 'Bot';
			this.game.sendMove(move.row, move.col, this.token)
				.subscribe(
					response => this.handleResponse(response),
					error => this.handleError(error)
				);
		} else {
			this.checkWinner();
		}
	}

	// Check if the game has been won
	checkWinner(): void {
		if(!this.canPlayerDoAnything()) {
			this.setOutcome('No moves possible, the game is a tie.');
		} else if(this.winner !== null) {
			if(this.winner.figure === 'x') {
				this.setOutcome('We have a winner! The Player won the game.');
			} else if(this.winner.figure === 'o') {
				this.setOutcome('We have a winner! The Bot won the game.');
			}
		}
	}

	// Check if the user can still do anything on the board
	canPlayerDoAnything(): boolean {
		return this.anyPossibleMoves() !== false && this.winner === null;
	}

	// Check the board for any possible moves
	anyPossibleMoves(): boolean {
		return this.board.find(x => x.includes(null)) !== undefined;
	}


	// Sets the outcome for a game.
	setOutcome(outcome: string) {
		this.outcome = outcome;
		this.whoseTurn = null;
	}
}
