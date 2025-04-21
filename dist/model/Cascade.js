var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Component"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cascade = void 0;
    var Component_1 = require("./Component");
    var Cascade = /** @class */ (function (_super) {
        __extends(Cascade, _super);
        function Cascade(position) {
            var _this = _super.call(this) || this;
            _this.position = position;
            _this.cards = new Array();
            return _this;
        }
        Cascade.prototype.setPosition = function (newPosition) {
            this.position = newPosition;
        };
        Cascade.prototype.getHead = function () {
            return this.cards[this.cards.length - 1];
        };
        Cascade.prototype.getTail = function () {
            return this.cards[0];
        };
        Cascade.prototype.addAtTop = function (card) {
            this.cards.push(card);
        };
        Cascade.prototype.isEmpty = function () {
            return (this.cards.length == 0);
        };
        Cascade.prototype.size = function () {
            return this.cards.length;
        };
        Cascade.prototype.addAtBottom = function (card) {
            this.cards.push(card);
        };
        Cascade.prototype.getPosition = function () {
            return this.position;
        };
        Cascade.prototype.remove = function (card) {
            var indexRemoved = this.cards.indexOf(card);
            if (indexRemoved > -1) {
                this.cards = __spreadArray(__spreadArray([], this.cards.slice(0, indexRemoved), true), this.cards.slice(indexRemoved + 1), true);
                return true;
            }
            return false;
        };
        Cascade.prototype.toString = function () {
            var str = new Array();
            var card;
            for (card in this.cards) {
                str.push(card.toString() + " ");
            }
            return str.toString();
        };
        Cascade.prototype.removeAt = function (position) {
            var returned = new Cascade(this.getPosition());
            for (var i = position; i < this.size(); i++) {
                if (position + 1 == this.size()) {
                    return this.cards[position];
                }
                returned.addAtBottom(this.cards[i]);
                this.remove(this.cards[i]);
            }
            return returned;
        };
        return Cascade;
    }(Component_1.Component));
    exports.Cascade = Cascade;
});
