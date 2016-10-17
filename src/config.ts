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