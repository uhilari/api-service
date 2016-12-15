"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var config_1 = require('./config');
var api_service_1 = require('./api.service');
var extender_1 = require('./extender');
var errors_1 = require('./errors');
var ApiFactory = (function () {
    function ApiFactory(apiCfgs, http) {
        this.apiCfgs = apiCfgs;
        this.http = http;
    }
    ApiFactory.prototype.createService = function (nombre) {
        var cfg = null;
        for (var i = 0; i < this.apiCfgs.length; i++) {
            if (this.apiCfgs[i].hasOwnProperty(nombre)) {
                cfg = this.apiCfgs[i][nombre];
                break;
            }
        }
        if (cfg == null) {
            throw new errors_1.ApiConfigNotFoundException(nombre);
        }
        var service = new api_service_1.ApiServiceObject(this.http, cfg);
        var opts = extender_1.ApiExtender.filter(cfg.operaciones, function (c) { return c.static == true; });
        extender_1.ApiExtender.Extend(service, opts, service);
        return service;
    };
    ApiFactory = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(config_1.API_CONFIG)), 
        __metadata('design:paramtypes', [Array, http_1.Http])
    ], ApiFactory);
    return ApiFactory;
}());
exports.ApiFactory = ApiFactory;
//# sourceMappingURL=api.factory.js.map