import { Observable } from 'rxjs/Rx';
import { RequestMethod } from '@angular/http';
import { ApiConfig, ApiRequest, Model } from './config';

export class ModelObject implements Model {
	constructor(private _id: string, private _data: any, private _api: ApiRequest) {
	}

	public save(): Observable<void>  {
		if (this._id !== ""){
			return this._api.request("/md/" + this._id, {
				method: RequestMethod.Put,
				body: this._data
			});
		}
		return this._api.request("/nv", {
			method: RequestMethod.Post,
			body: this._data
		});
	}

	public delete(): Observable<void> {
		if (this._id !== "") {
			return this._api.request("/rm/" + this._id, { method: RequestMethod.Delete });
		}
		return new Observable<void>(obs => {
			obs.next();
			obs.complete();
		});
	}
}
