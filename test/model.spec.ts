import { TestBed } from '@angular/core/testing';

describe('Model Testing', ()=> {
	it('Model Creado', () => {
		var model = new Model();
		expect(model).toBeDefined();
	});
});