import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  template: `
  	<div>
  		<p><b>Game Token:</b> <strong *ngIf="token !== undefined">{{token}}</strong></p>
  		<p>Answer from API:</p>
  		<button (click)="checkGameStatus()">
  			Check status
  		</button>
  		<app-board
  			[board]="board"
  			(userMove)="handleUserMove($event)">
  		</app-board>
  	</div>
  `,
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	apiResponse: Promise<any>;
	token: string;
	board: any[];
	player: any;
	winner: any;

	whoseTurn: string = 'bot';

	constructor(private game: GameService) { }

	ngOnInit() {
		this.game.initGame()
			.subscribe(
				response => {
					console.log(response);
					this.token = response.token;
					this.updateData(
						response.game.board,
						response.game.player,
						response.game.winner
					);
					this.whoseTurn = 'player';
					this.game.saveToken(this.token);
				},
				error => console.log(error)
			);
	}

	checkGameStatus() {
		this.game.getStatus(this.token)
			.subscribe(
				response => {
					this.updateData(
						response.game.board,
						response.game.player,
						response.game.winner
					);
					console.log('Updated data: ', this.board, this.player, this.winner);
				},
				error => console.log(error)
			);
	}

	handleUserMove(move) {
		this.whoseTurn = 'bot';
		this.game.sendMove(move.row, move.col, this.token)
			.subscribe(
				response => {
					console.log('Got response from movement.', response);
					this.updateData(
						response.game.board,
						response.game.player,
						response.game.winner
					);
				},
				error => console.log(error)
			);
	}

	updateData(board, player, winner) {
		this.board = board;
		this.player = player;
		this.winner = winner;
	}

}
