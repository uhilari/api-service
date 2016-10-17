import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { ApiConfig } from './config';

export interface Model {
	save(): Observable<void>;
	delete(): Observable<void>;
}

export class ModelObject implements Model {
	constructor(private _id: string, private _data: any, private _api: ApiService) {
	}

	public save(): Observable<void>  {
		if (this._id !== ""){
			return this._api.put("/md/" + this._id, this._data);
		}
		return this._api.post("/nv", this._data);
	}

	public delete(): Observable<void> {
		if (this._id !== "") {
			return this._api.delete("/rm/" + this._id);
		}
		return new Observable<void>(obs => {
			obs.next();
			obs.complete();
		});
	}
}
