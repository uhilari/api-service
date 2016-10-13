import { Observable } from 'rxjs/Rx';

export interface ApiService{
	request(url: string, data: any): Observable<void>;
}