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
    exports.Suit = void 0;
    var Suit;
    (function (Suit) {
        Suit[Suit["HEARTS"] = 0] = "HEARTS";
        Suit[Suit["CLUBS"] = 1] = "CLUBS";
        Suit[Suit["DIAMONDS"] = 2] = "DIAMONDS";
        Suit[Suit["SPADES"] = 3] = "SPADES";
    })(Suit || (exports.Suit = Suit = {}));
});
