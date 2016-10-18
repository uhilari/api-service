import { Observable } from 'rxjs/Rx';
import { TestBed, inject, tick } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Model } from '../src/index';
import { ApiServiceObject } from '../src/api.service';
import { mockObservableEmpty, mockNext, mockError, toHaveBeenCallNext, toHaveBeenCallError } from './util';

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
		apiService = new ApiServiceObject('http://localhost:8010/apisvc', TestBed.get(Http));
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
			conn.mockError(new Error("No tiene permiso"));
		});
	});

	describe('ApiService createModel', () => {
		it('Create New', () => {
			apiService.createModel().subscribe(m => {
				expect(m).toBeDefined();
			});
		});
		it('Create Exists', () => {
			apiService.createModel("1").subscribe(m => {
				expect(m).toBeDefined();
			});
		});
	});
});

interface ModelSample extends Model{
	Nombre: string;
}