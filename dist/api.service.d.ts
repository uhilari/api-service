import { Observable } from 'rxjs/Rx';
import { Http, RequestOptionsArgs } from '@angular/http';
import { ApiConfig, ApiService, ApiRequest, Model } from './config';
export declare class ApiServiceObject implements ApiService, ApiRequest {
    private http;
    private config;
    private baseUrl;
    constructor(http: Http, config: ApiConfig);
    request<T>(url: string, options?: RequestOptionsArgs): Observable<T>;
    createModel<T extends Model>(id?: any): Observable<T>;
}
