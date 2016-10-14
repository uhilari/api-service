import { Observable } from 'rxjs/Rx';
import { TestBed } from '@angular/core/testing';
import { Model, ApiService } from '../src/index';
import { ModelObject } from '../src/model';

describe('Model Testing', ()=> {
	let model: Model;
	let apiMock: ApiService = {
		request: () => new Observable<void>(() => {})
	};
	let id = "1";
	let data = { Nombre: "Juan Perez" };

	it('Model Created', () => {
		model = new ModelObject(id, data, apiMock);
		expect(model).toBeDefined();
	});

	describe('Save New', () => {
		it('Successfull', () => {
			spyOn(apiMock, 'request');
			model = new ModelObject("", data, apiMock);

			model.save();
			expect(apiMock.request).toHaveBeenCalledWith("/nv", data);
		});
	});
});