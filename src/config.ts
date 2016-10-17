import { Observable } from 'rxjs/Rx';

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
	tipo?: OperacionTipo
	parametros?: any
}

export enum OperacionTipo {
	Get,
	Post,
	Put,
	Delete
}

export interface ApiService{
	get<T>(url: string): Observable<T>;
	post(url: string, data: any): Observable<void>;
	put(url: string, data: any): Observable<void>;
	delete(url: string): Observable<void>;
	createModel<T extends Model>(id?: any): Observable<T>;
}

export interface Model {
	save(): Observable<void>;
	delete(): Observable<void>;
}
