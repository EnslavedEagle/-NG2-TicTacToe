import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game';

@Component({
  selector: 'app-game',
  template: `
  	<div>
  		<div class="gameOver" *ngIf="outcome !== null">
			<div class="outcome">
				Game is over! {{outcome}}
			</div>
	  	</div>
	  	<div class="buttons" *ngIf="outcome !== null || token === undefined">
			<button (click)="restart(true)">I want to start</button>
			<button (click)="restart(false)">I want the Bot to start</button>
		</div>
  		<div class="turn" *ngIf="whoseTurn !== null">{{whoseTurn}}'s Turn</div>
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

	constructor(private game: GameService) { }

	ngOnInit() {
		this.initGame();
	}

	handleResponse(res): void {
		console.log('Got response: ', res);
		this.token = res.token || this.token;
		this.game.saveToken(this.token);
		this.board = res.game.board || this.board;
		this.player = res.game.player || this.player;
		this.winner = res.game.winner;

		this.whoseTurn = 'Player';
		this.checkWinner();
	}

	handleError(error): void {
		console.error('There was an error: ', error);
	}

	initGame() {
		this.game.initGame()
			.subscribe(
				response => this.handleResponse(response),
				error => this.handleError(error)
			);
	}

	restart(userStarts) {
		console.log('Trying to start a new game');
		this.outcome = null;
		this.game.startNewGame(userStarts)
			.subscribe(
				response => this.handleResponse(response),
				error => this.handleError(error)
			);
	}

	checkGameStatus() {
		this.game.getStatus(this.token)
			.subscribe(
				response => this.handleResponse(response),
				error => this.handleError(error)
			);
	}

	handleUserMove(move) {
		if(this.checkMoves()) {
			this.whoseTurn = 'Bot';
			this.game.sendMove(move.row, move.col, this.token)
				.subscribe(
					response => this.handleResponse(response),
					error => this.handleError(error)
				);
		} else {
			this.checkWinner();
			console.error('No moves possible or the game is over.');
		}
	}

	checkWinner(): void {
		if(this.getPossibleMoves() <= 0 && this.winner === null) {
			this.setOutcome('No moves possible, the game is a tie.');
		} else if(this.winner !== null) {
			if(this.winner.figure === 'x') {
				this.setOutcome('We have a winner! The Player won the game.');
			} else if(this.winner.figure === 'o') {
				this.setOutcome('We have a winner! The Bot won the game.');
			}
		}
	}

	checkMoves(): boolean {
		return this.getPossibleMoves() > 0 && this.winner === null;
	}

	getPossibleMoves(): number {
		let moves = 0;
		this.board.forEach((x) => { moves += x.includes(null) ? 1 : 0; });
		return moves;
	}


	// Sets the outcome for a game.
	setOutcome(outcome: string) {
		this.outcome = outcome;
		this.whoseTurn = null;
	}
}
