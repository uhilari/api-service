import { Observable } from 'rxjs/Rx';

export interface ApiService{
	post(url: string, data: any): Observable<void>;
	put(url: string, data: any): Observable<void>;
	delete(url: string): Observable<void>;
}

export class ApiServiceObject implements ApiService {
	public post(url: string, data: any): Observable<void> {
		throw "No implementado";
	}

	public put(url: string, data: any): Observable<void>{
		throw "No implementado";
	}

	public delete(url: string): Observable<void>{
		throw "No implementado";
	}
}