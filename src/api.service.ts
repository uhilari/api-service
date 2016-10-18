import { Observable, Observer } from 'rxjs/Rx';
import { Http, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { ApiService, ApiRequest, Model } from './config';
import { ModelObject } from './model';

export class ApiServiceObject implements ApiService, ApiRequest {
	constructor(private baseUrl: string, private http: Http){}

	public request<T>(url: string, options?: RequestOptionsArgs): Observable<T>{
		let opts: RequestOptionsArgs = options || {};
		return this.http.request(this.baseUrl + url, options)
			.map<T>(r => r.json());
	}

	public createModel<T extends Model>(id?: any): Observable<T>{
		return new Observable<T>((obs: Observer<T>) => {
			if (id) {
				let model: any = new ModelObject("", {}, this);
				obs.next(model);
				obs.complete();
			}
			else {
				this.request<any>("/un/" + id, { method: RequestMethod.Get })
					.subscribe(m => {
						let model: any = new ModelObject(id, m, this);
						obs.next(model);
						obs.complete();
					});
			}
		});
	}
}