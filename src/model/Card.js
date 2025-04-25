"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Component_1 = require("./Component");
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(color, type, position, num) {
        var _this = _super.call(this) || this;
        _this.color = color;
        _this.suit = type;
        _this.position = position;
        _this.num = num;
        return _this;
    }
    // @Override
    Card.prototype.setPosition = function (newPosition) {
        this.position = newPosition;
    };
    //@Override
    Card.prototype.getPosition = function () {
        return this.position;
    };
    Card.prototype.getColor = function () {
        return this.color;
    };
    Card.prototype.getSuit = function () {
        return this.suit;
    };
    Card.prototype.getNumber = function () {
        return this.num;
    };
    // @Override
    Card.prototype.getHead = function () {
        return this;
    };
    //Card.prototype.toString = function () {
    //    return "Card is: " + this.getColor().toString() + this.num.toString() + this.suit.toString()
     //       + "at Position: " + this.position.getX() + " " + this.position.getY();
    //};
    return Card;
}(Component_1.Component));
exports.Card = Card;
