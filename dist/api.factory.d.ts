import { Http } from '@angular/http';
import { ApiConfigs, ApiService } from './config';
export declare class ApiFactory {
    private apiCfgs;
    private http;
    constructor(apiCfgs: ApiConfigs[], http: Http);
    createService(nombre: string): ApiService;
}
