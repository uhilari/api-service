import { Observable } from 'rxjs/Rx';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '../src/index';
import { ApiServiceObject } from '../src/api.service';
import { mockObservableEmpty, mockNext, mockError, toHaveBeenCallNext, toHaveBeenCallError } from './util';

describe('ApiService Testing', () => {
	let apiService: ApiService;

	it('Creado', () => {
		apiService = new ApiServiceObject();
		expect(apiService).toBeDefined();
	});

	describe('ApiService Post', () => {
		beforeEach(() => {
			apiService = new ApiServiceObject();
		});

		it('Observable Next', () => {
			toHaveBeenCallNext(apiService.post('/nv', {}));
		});
	});
});