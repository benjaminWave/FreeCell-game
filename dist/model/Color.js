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
    exports.Color = void 0;
    var Color;
    (function (Color) {
        Color[Color["BLACK"] = 0] = "BLACK";
        Color[Color["RED"] = 1] = "RED";
    })(Color || (exports.Color = Color = {}));
});
