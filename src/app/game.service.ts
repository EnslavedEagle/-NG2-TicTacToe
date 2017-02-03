import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GameService {
	private api_url: string = "http://interview.314.tt/api/game";

	startGame(): Observable<any> {
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

	getStatus(gameToken): any {
		let headers = new Headers({'Content-Type':'application/json'});
		let options = {
			headers: headers,
			token: gameToken
		};
		return this.http.get(this.api_url, options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Status check failed: Server Error'));
	}

	testAPI(): Observable<any> {
		return this.http.get('http://localhost:8080/hello/Patryk');
	}

	constructor(private http: Http) { }

}
