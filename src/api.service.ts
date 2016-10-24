import { Observable, Observer } from 'rxjs/Rx';
import { Http, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { ApiConfig, ApiService, ApiRequest, Model } from './config';
import { ModelObject } from './model';
import { ApiExtender } from './extender';

export class ApiServiceObject implements ApiService, ApiRequest {
	private baseUrl: string;
	constructor(private http: Http, private config: ApiConfig) {
		this.baseUrl = config.url;
	}

	public request<T>(url: string, options?: RequestOptionsArgs): Observable<T>{
		let opts: RequestOptionsArgs = options || {};
		return this.http.request(this.baseUrl + url, options)
			.map<T>(r => r.json());
	}

	public createModel<T extends Model>(id?: any): Observable<T>{
		return new Observable<T>((obs: Observer<T>) => {
			let opts = ApiExtender.filter(this.config.operaciones, c => c.static == false);
			let complete = (model: any) => {
				ApiExtender.Extend(model, opts, this);
				obs.next(model);
				obs.complete();
			};
			if (id) {
				this.request<any>("/un/" + id, { method: RequestMethod.Get })
					.subscribe(m => {
						complete(new ModelObject(id, m, this));
					}, r => {
						obs.error(r);
					});
			}
			else {
				complete(new ModelObject("", {}, this));
			}
		});
	}
}