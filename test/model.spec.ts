import { Observable } from 'rxjs/Rx';
import { TestBed } from '@angular/core/testing';
import { Model, ApiService } from '../src/index';
import { ModelObject } from '../src/model';

describe('Model Testing', ()=> {
	let model: Model;
	let apiMock: ApiService = {
		request: () => new Observable<void>(() => {})
	};

	it('Model Created', () => {
		model = new ModelObject("1", { Nombre: "Juan Perez" }, apiMock);
		expect(model).toBeDefined();
	});

	describe('Save New', () => {
		it('Successfull', () => {
			apiMock.request = (url: string) => {
				if (url !== "/nv")
					throw Error("Url is not for new");
				return new Observable<void>(() => {});
			}
		});
	});
});