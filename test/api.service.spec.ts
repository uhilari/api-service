import { Observable } from 'rxjs/Rx';
import { TestBed, inject, tick } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Model, ApiConfig } from '../src/index';
import { ApiServiceObject } from '../src/api.service';
import { mockObservableEmpty, mockNext, mockError, toHaveBeenCallNext, toHaveBeenCallError, MockError } from './util';

describe('ApiService Testing', () => {
	let apiService: ApiServiceObject;

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
		let cfg: ApiConfig = {
			url: '/apisvc',
			operaciones: {
				hijos: {
					url: '/chld/{id}',
					static: false
				}
			}
		};
		apiService = new ApiServiceObject('http://localhost:8010/apisvc', TestBed.get(Http), cfg);
	});

	it('Creado', () => {
		expect(apiService).toBeDefined();
	});

	describe('ApiService request', () => {
		let conn: MockConnection;
		beforeEach(inject([MockBackend], (mockBackend: MockBackend) => {
			mockBackend.connections.subscribe((c: MockConnection) => {
				expect(c.request.url).toBe("http://localhost:8010/apisvc/un/1");
				expect(c.request.method).toBe(RequestMethod.Get);
				conn = c;
			});
		}));
		it('Observable Next', () => {
			toHaveBeenCallNext(apiService.request<any>('/un/1')).subscribe(d => {
				expect(d.Nombre).toBe("Juan Perez");
			});
			let responseOpts = new ResponseOptions({body:'{ "Nombre" : "Juan Perez" }'});
			conn.mockRespond(new Response(responseOpts));
		});
		it('Observable Error', () => {
			toHaveBeenCallError(apiService.request<any>('/un/1'));
			conn.mockError(new MockError(new ResponseOptions({ status: 403, statusText: 'Recurso no encontrado' })));
		});
	});

	describe('ApiService createModel', () => {
		it('Create New', () => {
			apiService.createModel().subscribe(m => {
				expect(m).toBeDefined();
			});
		});
		it('Create Exists', inject([MockBackend], (mockBackend: MockBackend) => {
			let conn: MockConnection;
			mockBackend.connections.subscribe(c => { conn = c; });
			toHaveBeenCallNext(apiService.createModel("1"));
			conn.mockRespond(new Response(new ResponseOptions({ body: '{ "Nombre": "Juan Perez" }' })));
		}));
		it('Create Not Exists', inject([MockBackend], (mockBackend: MockBackend) => {
			let conn: MockConnection;
			mockBackend.connections.subscribe(c => { conn = c; });
			toHaveBeenCallError(apiService.createModel("1"));
			conn.mockError(new MockError(new ResponseOptions({ status: 404, statusText: 'Recurso no encontrado' })));
		}));
	});
});

interface ModelSample extends Model{
	Nombre: string;
}