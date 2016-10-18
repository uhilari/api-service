import { ApiRequest, OperacionConfigList } from '../src/config';
import { ApiExtender } from '../src/extender';
import { mockObservableEmpty, toHaveBeenCallNext } from './util';

describe('Extender', () => {
	let cfg: OperacionConfigList;
	let api: ApiRequest;
	let objeto: any;
	beforeEach(() => {
		cfg = {
			"lista": {
				url: '/lt'
			}
		};
		api = {
			request: mockObservableEmpty
		};
		objeto = { _id: 3 };		
	});

	it('Agrega Metodo', () => {
		ApiExtender.Extend(objeto, cfg, api);
		expect(objeto['lista']).toBeDefined();
		toHaveBeenCallNext(objeto.lista());
	});
	it('Url Statica', () => {
		spyOn(api, 'request');
		ApiExtender.Extend(objeto, cfg, api);
		objeto.lista();
		expect(api.request).toHaveBeenCalledWith('/lt');
	});
	it('Url Template', () => {
		cfg["lista"].url = '/lt/{0}';
		spyOn(api, 'request');
		ApiExtender.Extend(objeto, cfg, api);
		objeto.lista(5);
		expect(api.request).toHaveBeenCalledWith('/lt/5');
	});
	it('Url with id', () => {
		cfg["lista"].url = '/lt/{id}';
		spyOn(api, 'request');
		ApiExtender.Extend(objeto, cfg, api);
		objeto.lista();
		expect(api.request).toHaveBeenCalledWith('/lt/3');
	});
});