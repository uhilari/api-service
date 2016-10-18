import { Observable } from 'rxjs/Rx';
import { TestBed } from '@angular/core/testing';
import { RequestMethod } from '@angular/http';
import { Model, ApiRequest } from '../src/index';
import { ModelObject } from '../src/model';
import { mockObservableEmpty, mockNext, mockError, toHaveBeenCallNext, toHaveBeenCallError } from './util';

describe('Model', ()=> {
	let model: Model;
	let apiMock: ApiRequest = {
		request: mockObservableEmpty
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
			spyOn(apiMock, 'request');
			model.save();
			expect(apiMock.request).toHaveBeenCalledWith("/nv", { method: RequestMethod.Post, body: data });
		});
		it('Call Update', () => {
			spyOn(apiMock, 'request');
			model['_id'] = "1";
			model.save();
			expect(apiMock.request).toHaveBeenCalledWith("/md/1", { method: RequestMethod.Put, body: data });
		});
		it('Call Observable Next', () => {
			apiMock.request = mockNext;
			toHaveBeenCallNext(model.save());
		})
		it('Call Observable Error', () => {
			apiMock.request = mockError;
			toHaveBeenCallError(model.save());
		})
	});

	describe('Model Delete', () => {
		beforeEach(() => {
			model = new ModelObject("", data, apiMock);
		});
		it ('Call Delete', () => {
			spyOn(apiMock, 'request');
			model["_id"] = "1";
			model.delete();
			expect(apiMock.request).toHaveBeenCalledWith("/rm/1", { method: RequestMethod.Delete });
		});
		it ('Don\'t call api', () => {
			spyOn(apiMock, 'request');
			model.delete();
			expect(apiMock.request).not.toHaveBeenCalled();
		});
		it('Call Observable Next', () => {
			apiMock.request = mockNext;
			toHaveBeenCallNext(model.delete());
		})
		it('Call Observable Error', () => {
			model["_id"] = "1";
			apiMock.request = mockError;
			toHaveBeenCallError(model.delete());
		})
	});
});