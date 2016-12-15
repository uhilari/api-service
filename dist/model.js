"use strict";
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
var ModelObject = (function () {
    function ModelObject(_id, _data, _api) {
        this._id = _id;
        this._data = _data;
        this._api = _api;
    }
    ModelObject.prototype.save = function () {
        if (this._id !== "") {
            return this._api.request("/md/" + this._id, {
                method: http_1.RequestMethod.Put,
                body: this._data
            });
        }
        return this._api.request("/nv", {
            method: http_1.RequestMethod.Post,
            body: this._data
        });
    };
    ModelObject.prototype.delete = function () {
        if (this._id !== "") {
            return this._api.request("/rm/" + this._id, { method: http_1.RequestMethod.Delete });
        }
        return new Rx_1.Observable(function (obs) {
            obs.next();
            obs.complete();
        });
    };
    return ModelObject;
}());
exports.ModelObject = ModelObject;
//# sourceMappingURL=model.js.map