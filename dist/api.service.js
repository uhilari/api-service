"use strict";
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
var model_1 = require('./model');
var extender_1 = require('./extender');
var ApiServiceObject = (function () {
    function ApiServiceObject(http, config) {
        this.http = http;
        this.config = config;
        this.baseUrl = config.url;
    }
    ApiServiceObject.prototype.request = function (url, options) {
        var opts = options || {};
        return this.http.request(this.baseUrl + url, options)
            .map(function (r) { return r.json(); });
    };
    ApiServiceObject.prototype.createModel = function (id) {
        var _this = this;
        return new Rx_1.Observable(function (obs) {
            var opts = extender_1.ApiExtender.filter(_this.config.operaciones, function (c) { return c.static == false; });
            var complete = function (model) {
                extender_1.ApiExtender.Extend(model, opts, _this);
                obs.next(model);
                obs.complete();
            };
            if (id) {
                _this.request("/un/" + id, { method: http_1.RequestMethod.Get })
                    .subscribe(function (m) {
                    complete(new model_1.ModelObject(id, m, _this));
                }, function (r) {
                    obs.error(r);
                });
            }
            else {
                complete(new model_1.ModelObject("", {}, _this));
            }
        });
    };
    return ApiServiceObject;
}());
exports.ApiServiceObject = ApiServiceObject;
//# sourceMappingURL=api.service.js.map