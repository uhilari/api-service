import { Observer, Observable } from 'rxjs/Rx';

export function mockObservableEmpty(): Observable<any> {
	return new Observable<any>(obs => {});
};

export function mockNext(): Observable<any> {
	return new Observable<any>((obs: Observer<any>) => {
		obs.next({});
		obs.complete();
	});
}

export function mockError(): Observable<any> {
	return new Observable<any>((obs: Observer<any>) => {
		obs.error({});
	});
}

export function toHaveBeenCallNext<T>(obs: Observable<T>): Observable<T> {
	var fnc = jasmine.createSpy('success');
	obs.subscribe(fnc);
	obs.finally(() => {
		expect(fnc).toHaveBeenCalled();	
	});
	return obs;
}

export function toHaveBeenCallError<T>(obs: Observable<T>): Observable<T> {
	var fnc = jasmine.createSpy('error');
	obs.subscribe(null, fnc);
	obs.finally(() => {
		expect(fnc).toHaveBeenCalled();	
	});
	return obs;
}