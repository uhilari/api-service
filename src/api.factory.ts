import { Http } from '@angular/http';
import { ApiConfigs, ApiService, ApiFactory } from './config';
import { ApiServiceObject } from './api.service';
import { ApiExtender } from './extender';
import { ApiConfigNotFoundException } from './errors';

export class ApiFactoryObject implements ApiFactory {
	constructor(private apiCfgs: ApiConfigs, private http: Http){
	}

	public createService(nombre: string): ApiService {
		if (!this.apiCfgs.hasOwnProperty(nombre)){
			throw new ApiConfigNotFoundException(nombre);
		}
		let cfg = this.apiCfgs[nombre];
		let service = new ApiServiceObject(this.http, cfg);
		let opts = ApiExtender.filter(cfg.operaciones, c => c.static);
		ApiExtender.Extend(service, opts, service);
		return service;
	}
}