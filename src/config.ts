import { Observable } from 'rxjs/Rx';
import { OpaqueToken } from '@angular/core';
import { RequestMethod, RequestOptionsArgs } from '@angular/http';

export const API_CONFIG = new OpaqueToken('API_CONFIG');

export interface ApiConfigs {
	[nombre: string]: ApiConfig
}

export interface ApiConfig{
	url: string;
	operaciones?: OperacionConfigList
}

export interface OperacionConfigList {
	[nombre: string]: OperacionConfig
}

export interface OperacionConfig {
	url: string;
	tipo?: RequestMethod
	parametros?: any
	static?: boolean;
}

export interface ApiService{
	createModel<T extends Model>(id?: any): Observable<T>;
}

export interface ApiRequest {
	request<T>(url: string, options?: RequestOptionsArgs)
}

export interface Model {
	save(): Observable<void>;
	delete(): Observable<void>;
}
