import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-board',
	template: `
		<div>
			<table class="board">
				<tr *ngFor="let row of board; let i = index">
					<td class="cell" *ngFor="let col of row; let j = index"
						(click)="registerMove(i, j)"
						[ngClass]="{'highlight' : highlight !== undefined && highlight.includes([i,j]) }">
						<span *ngIf="board[i][j] === 'x'" class="cross fa fa-times"></span>
						<span *ngIf="board[i][j] === 'o'" class="circle fa fa-circle-o"></span>
					</td>
				</tr>
			</table>
		</div>
	`,
	styleUrls: ['board.component.css']
})
export class BoardComponent {
	@Input() board;
	@Input() whoseTurn;
	@Output() userMove = new EventEmitter();

	highlight: boolean[];

	constructor() { }

	registerMove(row,col) {
		if(this.board[row][col] !== null) {
			console.error('This field is already taken!');
			return false;
		}
		this.userMove.emit({row: row, col: col});
	}
}
