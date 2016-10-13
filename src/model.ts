import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';

export interface Model {
	save(): Observable<void>;
}

export class ModelObject {
	constructor(private _id: string, private _data: any, private _api: ApiService) {
	}

	public save(): Observable<void>  {
		let url = (this._id === "") ? "/nv" : "/md/" + this._id;
		return this._api.request(url, this._data);
	}
}