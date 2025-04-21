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
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TableauIterator = exports.Tableau = void 0;
    var Tableau = /** @class */ (function () {
        function Tableau(number) {
            this.number = number;
            this.cards = new Array();
        }
        Tableau.prototype.getNumber = function () {
            return this.number;
        };
        Tableau.prototype.add = function (comp) {
            this.cards.push(comp);
        };
        Tableau.prototype.remove = function (comp) {
            var indexRemoved = this.cards.indexOf(comp);
            if (indexRemoved > -1) {
                this.cards = __spreadArray(__spreadArray([], this.cards.slice(0, indexRemoved), true), this.cards.slice(indexRemoved + 1), true);
                return true;
            }
            return false;
        };
        Tableau.prototype.replace = function (original, replacement) {
            this.cards[this.cards.indexOf(original)] = replacement;
        };
        Tableau.prototype.getHead = function () {
            return this.cards[this.cards.length - 1];
        };
        Tableau.prototype.isEmpty = function () {
            return (this.cards.length == 0);
        };
        Tableau.prototype.size = function () {
            return this.cards.length;
        };
        Tableau.prototype[Symbol.iterator] = function () {
            return new TableauIterator(this);
        };
        return Tableau;
    }());
    exports.Tableau = Tableau;
    var TableauIterator = /** @class */ (function () {
        function TableauIterator(tab) {
            this.currentPosition = tab.size() - 1;
        }
        TableauIterator.prototype.next = function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var value = _a[0];
            throw new Error("Method not implemented.");
        };
        TableauIterator.prototype.return = function (value) {
            throw new Error("Method not implemented.");
        };
        TableauIterator.prototype.throw = function (e) {
            throw new Error("Method not implemented.");
        };
        return TableauIterator;
    }());
    exports.TableauIterator = TableauIterator;
});
