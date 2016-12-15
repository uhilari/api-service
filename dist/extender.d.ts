import { OperacionConfigList, OperacionConfig, ApiRequest } from './config';
export declare class ApiExtender {
    static Extend(objeto: any, cfg: OperacionConfigList, api: ApiRequest): void;
    static filter(operaciones: OperacionConfigList, fnc: (cfg: OperacionConfig) => boolean): OperacionConfigList;
}
