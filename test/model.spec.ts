import { Observable } from 'rxjs/Rx';
import { TestBed } from '@angular/core/testing';
import { Model, ApiService } from '../src/index';
import { ModelObject } from '../src/model';
import { mockObservableEmpty, mockNext, mockError, toHaveBeenCallNext, toHaveBeenCallError } from './util';

describe('Model', ()=> {
	let model: Model;
	let apiMock: ApiService = {
		post: mockObservableEmpty,
		put: mockObservableEmpty,
		delete: mockObservableEmpty
	};
	let id = "1";
	let data = { Nombre: "Juan Perez" };

	it('Created', () => {
		model = new ModelObject(id, data, apiMock);
		expect(model).toBeDefined();
	});

	describe('Model Save', () => {
		beforeEach(() => {
			model = new ModelObject("", data, apiMock);
		});
		it('Call New', () => {
			spyOn(apiMock, 'post');

			model.save();
			expect(apiMock.post).toHaveBeenCalledWith("/nv", data);
		});
		it('Call Update', () => {
			spyOn(apiMock, 'put');
			model['_id'] = "1";
			model.save();
			expect(apiMock.put).toHaveBeenCalledWith("/md/1", data);
		});
		it('Call Observable Next', () => {
			apiMock.post = mockNext;
			toHaveBeenCallNext(model.save());
		})
		it('Call Observable Error', () => {
			apiMock.post = mockError;
			toHaveBeenCallError(model.save());
		})
	});

	describe('Model Delete', () => {
		beforeEach(() => {
			model = new ModelObject("", data, apiMock);
		});
		it ('Call Delete', () => {
			spyOn(apiMock, 'delete');
			model["_id"] = "1";
			model.delete();
			expect(apiMock.delete).toHaveBeenCalledWith("/rm/1");
		});
		it ('Don\'t call api', () => {
			spyOn(apiMock, 'delete');
			model.delete();
			expect(apiMock.delete).not.toHaveBeenCalled();
		});
		it('Call Observable Next', () => {
			apiMock.delete = mockNext;
			toHaveBeenCallNext(model.delete());
		})
		it('Call Observable Error', () => {
			model["_id"] = "1";
			apiMock.delete = mockError;
			toHaveBeenCallError(model.delete());
		})
	});
});