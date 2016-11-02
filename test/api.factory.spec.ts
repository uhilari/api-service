import { TestBed, inject, tick } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ApiConfigs } from '../src/index';
import { ApiFactory } from '../src/api.factory';
import { ApiConfigNotFoundException } from '../src/errors';

describe('ApiFactory', () => {
	let factory: ApiFactory;

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
		let cfgs: ApiConfigs[] = [{
			"model": {
				url: '/apisvc',
				operaciones: {
					hijos: {
						url: '/chld/{id}',
						static: false
					},
					accion: {
						url: '/lt',
						static: true
					}
				}
			}
		}];
		factory = new ApiFactory(cfgs, TestBed.get(Http));
	});

	it('Creado', () => {
		expect(factory).toBeDefined();
	});

	describe('ApiFactory crearService', () => {
		it('Success', () => {
			let svc = factory.createService('model');
			expect(svc).toBeDefined();
		});

		it('Don\'t have config', () => {
			try{
				let svc = factory.createService('noModel');
				fail("Debe emitir un error");
			}
			catch(err) {
				if (!(err instanceof ApiConfigNotFoundException))
					fail("Debe emitir un ApiConfigNotFoundException");
			}
		});

		it('Extend api', () => {
			let svc = factory.createService('model')
			expect(svc.hasOwnProperty('accion')).toBeTruthy();
		});
	});
});