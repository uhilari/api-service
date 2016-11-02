import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ApiConfigs, ApiConfig, ApiService, API_CONFIG } from './config';
import { ApiServiceObject } from './api.service';
import { ApiExtender } from './extender';
import { ApiConfigNotFoundException } from './errors';

@Injectable()
export class ApiFactory {
	constructor(
		@Inject(API_CONFIG) private apiCfgs: ApiConfigs[], 
		private http: Http) {
	}

	public createService(nombre: string): ApiService {
		let cfg: ApiConfig = null;
		for(let i = 0; i < this.apiCfgs.length; i++) {
			if (this.apiCfgs[i].hasOwnProperty(nombre)){
				cfg = this.apiCfgs[i][nombre];
				break;
			}			
		}
		if (cfg == null) {
			throw new ApiConfigNotFoundException(nombre);			
		}
		let service = new ApiServiceObject(this.http, cfg);
		let opts = ApiExtender.filter(cfg.operaciones, c => c.static == true);
		ApiExtender.Extend(service, opts, service);
		return service;
	}
}