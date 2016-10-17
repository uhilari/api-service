import { Observable, Observer } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { ApiService, Model } from './config';
import { ModelObject } from './model';

export class ApiServiceObject implements ApiService {
	constructor(private baseUrl: string, private http: Http){}

	public get<T>(url: string): Observable<T> {
		return this.http.get(this.baseUrl + url)
			.map<T>(r => r.json());
	}

	public post(url: string, data: any): Observable<void> {
		return this.http.post(this.baseUrl + url, data)
			.map<void>(r => r.json());
	}

	public put(url: string, data: any): Observable<void>{
		return this.http.put(this.baseUrl + url, data)
			.map<void>(r => r.json());
	}

	public delete(url: string): Observable<void>{
		return this.http.delete(this.baseUrl + url)
			.map<void>(r => r.json());
	}

	public createModel<T extends Model>(id?: any): Observable<T>{
		if (id) {
			return this.http.get(this.baseUrl + '/un/' + id)
				.map<T>(r => r.json());
		}
		else {
			return new Observable<T>((obs: Observer<T>) => {
				let model: any = new ModelObject("", {}, this);
				obs.next(model);
				obs.complete();
			});
		}
	}
}