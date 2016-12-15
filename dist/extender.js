"use strict";
var ApiExtender = (function () {
    function ApiExtender() {
    }
    ApiExtender.Extend = function (objeto, cfg, api) {
        var _loop_1 = function(operacionName) {
            var operacionCfg = cfg[operacionName];
            objeto[operacionName] = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                var url = operacionCfg.url;
                if (objeto.hasOwnProperty('_id')) {
                    url = url.replace('{id}', objeto._id);
                }
                var prms = params || [];
                for (var i = 0; i < prms.length; i++) {
                    url = operacionCfg.url.replace('{' + i + '}', prms[i]);
                }
                return api.request(url);
            };
        };
        for (var operacionName in cfg) {
            _loop_1(operacionName);
        }
    };
    ApiExtender.filter = function (operaciones, fnc) {
        var lista = {};
        for (var s in operaciones) {
            if (fnc(operaciones[s])) {
                lista[s] = operaciones[s];
            }
        }
        return lista;
    };
    return ApiExtender;
}());
exports.ApiExtender = ApiExtender;
//# sourceMappingURL=extender.js.map