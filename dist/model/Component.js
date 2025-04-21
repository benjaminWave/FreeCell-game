(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    var Component = /** @class */ (function () {
        function Component() {
        }
        Component.prototype.getHead = function () {
            return this;
        };
        return Component;
    }());
    exports.Component = Component;
});
