import { Observable } from 'rxjs/Rx';
import { ApiRequest, Model } from './config';
export declare class ModelObject implements Model {
    private _id;
    private _data;
    private _api;
    constructor(_id: string, _data: any, _api: ApiRequest);
    save(): Observable<void>;
    delete(): Observable<void>;
}
