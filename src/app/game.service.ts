import { Injectable, Input } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GameService {
	private api_url: string = "http://interview.314.tt/api/game";

	constructor(private http: Http) { }

	initGame(): Observable<any> {
		var token = localStorage.getItem('token');
		if(token === null) {
			console.log('No token found. Starting new game');
			return this.startNewGame();
		} else {
			console.log('Saved token found: '+token+' Loading game status');
			return this.getStatus(token);
		}
	}

	startNewGame(): Observable<any> {
		let headers = new Headers({'Content-Type':'application/json'});
		let options = {
			headers: headers
		};
		let body = {
			"player": "x",
			"playerStarts": false
		};
		return this.http.post(this.api_url, body, options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Game start failed: Server Error'));
	}

	getStatus(token): any {
		console.log('Getting game status with token ', token);
		let headers = new Headers({'Content-Type':'application/json', 'token': token});
		let options = {
			headers: headers
		};
		return this.http.get(this.api_url, options)
			.map((res:Response) => {
				let data = res.json();
				data.token = token;
				return data;
			})
			.catch((error:any) => Observable.throw(error.json().error || 'Status check failed: Server Error'));
	}

	sendMove(col, row) {
		let headers = new Headers({'Content-Type':'application/json'});
		let options = {
			headers: headers
		};
		let body = {
			"x": col,
			"y": row
		};
		return this.http.post(this.api_url, options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Player move failed: Sever Error'));
	}

	saveToken(newToken): void {
		console.log('Saving token: ' + newToken);
		if(newToken !== undefined) {
			localStorage.setItem('token', newToken);
		}
	}

	loadToken(): string {
		return localStorage.getItem('token');
	}
}
