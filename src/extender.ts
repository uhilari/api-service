import { OperacionConfigList, OperacionConfig, ApiRequest } from './config';

export class ApiExtender {
	public static Extend(objeto: any, cfg: OperacionConfigList, api: ApiRequest){
		for(let operacionName in cfg){
			let operacionCfg = cfg[operacionName];
			objeto[operacionName] = (...params: any[]) => {
				let url = operacionCfg.url;
				if (objeto.hasOwnProperty('_id')) {
					url = url.replace('{id}', objeto._id);
				}
				let prms = params || [];
				for(let i=0; i<prms.length; i++) {
					url = operacionCfg.url.replace('{' + i + '}', prms[i]);
				}
				return api.request(url);
			};
		}
	}

	public static filter(operaciones: OperacionConfigList, fnc: (cfg: OperacionConfig) => boolean): OperacionConfigList {
		let lista: OperacionConfigList = {};
		for(let s in operaciones) {
			if (fnc(operaciones[s])) {
				lista[s] = operaciones[s];
			}
		}
		return lista;
	}
}