import { Observable } from 'rxjs/Rx';
import { TestBed, inject, tick } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ApiService, Model } from '../src/index';
import { ApiServiceObject } from '../src/api.service';
import { mockObservableEmpty, mockNext, mockError, toHaveBeenCallNext, toHaveBeenCallError } from './util';

describe('ApiService Testing', () => {
	let apiService: ApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MockBackend,
				BaseRequestOptions,
				{
					provide: Http,
					useFactory: (backend: MockBackend, opts: BaseRequestOptions) => new Http(backend, opts),
					deps: [MockBackend, BaseRequestOptions]
				}
			]
		});
		apiService = new ApiServiceObject('http://localhost:8010/apisvc', TestBed.get(Http));
	});

	it('Creado', () => {
		expect(apiService).toBeDefined();
	});

	describe('ApiService Get', () => {
		let conn: MockConnection;
		beforeEach(inject([MockBackend], (mockBackend: MockBackend) => {
			mockBackend.connections.subscribe((c: MockConnection) => {
				expect(c.request.url).toBe("http://localhost:8010/apisvc/un/1");
				expect(c.request.method).toBe(RequestMethod.Get);
				conn = c;
			});
		}));
		it('Observable Next', () => {
			toHaveBeenCallNext(apiService.get<any>('/un/1')).subscribe(d => {
				expect(d.Nombre).toBe("Juan Perez");
			});
			let responseOpts = new ResponseOptions({body:'{ "Nombre" : "Juan Perez" }'});
			conn.mockRespond(new Response(responseOpts));
		});
		it('Observable Error', () => {
			toHaveBeenCallError(apiService.get('/un/1'));
			conn.mockError(new Error("No tiene permiso"));
		});
	});

	describe('ApiService Post', () => {
		let conn: MockConnection;
		beforeEach(inject([MockBackend], (mockBackend: MockBackend) => {
			mockBackend.connections.subscribe(c => {
				expect(c.request.url).toBe("http://localhost:8010/apisvc/nv");
				expect(c.request.method).toBe(RequestMethod.Post);
				conn = c;
			});
		}));
		it('Observable Next', inject([MockBackend], (mockBackend: MockBackend) => {
			toHaveBeenCallNext(apiService.post('/nv', {}));
			let responseOpts = new ResponseOptions({body:null});
			conn.mockRespond(new Response(responseOpts));

		}));
		it('Observable Error', inject([MockBackend], (mockBackend: MockBackend) => {
			toHaveBeenCallError(apiService.post('/nv', {}));
			conn.mockError(new Error("No tiene permiso"));
		}));
	});

	describe('ApiService Put', () => {
		let conn: MockConnection;
		beforeEach(inject([MockBackend], (mockBackend: MockBackend) => {
			mockBackend.connections.subscribe(c => {
				expect(c.request.url).toBe("http://localhost:8010/apisvc/md/1");
				expect(c.request.method).toBe(RequestMethod.Put);
				conn = c;
			});
		}));
		it('Observable Next', inject([MockBackend], (mockBackend: MockBackend) => {
			toHaveBeenCallNext(apiService.put('/md/1', {}));
			let responseOpts = new ResponseOptions({body:null});
			conn.mockRespond(new Response(responseOpts));

		}));
		it('Observable Error', inject([MockBackend], (mockBackend: MockBackend) => {
			toHaveBeenCallError(apiService.put('/md/1', {}));
			conn.mockError(new Error("No tiene permiso"));
		}));
	});

	describe('ApiService Delete', () => {
		let conn: MockConnection;
		beforeEach(inject([MockBackend], (mockBackend: MockBackend) => {
			mockBackend.connections.subscribe(c => {
				expect(c.request.url).toBe("http://localhost:8010/apisvc/rm/1");
				expect(c.request.method).toBe(RequestMethod.Delete);
				conn = c;
			});
		}));
		it('Observable Next', inject([MockBackend], (mockBackend: MockBackend) => {
			toHaveBeenCallNext(apiService.delete('/rm/1'));
			let responseOpts = new ResponseOptions({body:null});
			conn.mockRespond(new Response(responseOpts));

		}));
		it('Observable Error', inject([MockBackend], (mockBackend: MockBackend) => {
			toHaveBeenCallError(apiService.delete('/rm/1'));
			conn.mockError(new Error("No tiene permiso"));
		}));
	});

	describe('ApiService GetModel', () => {
		it('Create New Model', () => {
			apiService.createModel<ModelSample>().subscribe(m => {
				expect(m).toBeDefined();
			});
		});
		it('Create Model Exists', inject([MockBackend], (mockBackend: MockBackend) => {
			let conn: MockConnection;
			mockBackend.connections.subscribe(c => {
				conn = c;
			});
			apiService.createModel<ModelSample>("1").subscribe(m => {
				expect(m.Nombre).toBeTruthy();
			});
			conn.mockRespond(new Response(new ResponseOptions({ body: '{ "Nombre": "Juan Perez" }' })));
		}));
	});
});

interface ModelSample extends Model{
	Nombre: string;
}