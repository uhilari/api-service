import { TestBed } from '@angular/core/testing';
import { ApiModule, ApiConfigs, ApiFactory, ApiService } from '../src/index';

describe('ApiModule', () => {
	let cfgs: ApiConfigs = {
		model: {
			url: '/apimodel',
			operaciones: {
				lista: {
					url: '/lt',
					static: true
				},
				opciones: {
					url: '/{id}/opts',
					static: false
				}
			}
		}
	};
	let apiFactory: ApiFactory;

	beforeEach(() => {
		let cfgModule = ApiModule.forApiService(cfgs);
		TestBed.configureTestingModule({
			imports: [ ApiModule, cfgModule ]
		});
		apiFactory = TestBed.get(ApiFactory);
	});

	it('Created', () => {
		expect(apiFactory).toBeDefined();
	});

	describe('ApiService', () => {
		let svc: ApiService;
		beforeEach(() => {
			svc = apiFactory.createService('model');			
		});
		it('ApiService Created', () => {
			expect(svc).toBeDefined();
		});
		it('ApiService have lista', () => {
			expect(svc.hasOwnProperty('lista')).toBeTruthy();
		});
		it('ApiService hasn\'t created', () => {
			expect(svc.hasOwnProperty('opciones')).toBeFalsy();
		});
	});
});