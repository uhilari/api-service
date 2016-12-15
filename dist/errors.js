"use strict";
var ApiConfigNotFoundException = (function () {
    function ApiConfigNotFoundException(name) {
        this.name = name;
        this.message = "No existe una configuración para '" + name + "'";
    }
    return ApiConfigNotFoundException;
}());
exports.ApiConfigNotFoundException = ApiConfigNotFoundException;
//# sourceMappingURL=errors.js.map