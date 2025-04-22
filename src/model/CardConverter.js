"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardConverter = void 0;
var CardNumber_1 = require("./CardNumber");
var Color_1 = require("./Color");
var Suit_1 = require("./Suit");
var CardConverter = /** @class */ (function () {
    function CardConverter() {
        var current = 1;
        for (var num in Object.values(CardNumber_1.CardNumber)) {
            CardConverter.map.set(num, current);
            current++;
        }
        current = 0;
        for (var suit in Object.values(Suit_1.Suit)) {
            if (current % 2 == 0) {
                CardConverter.map2.set(suit, Color_1.Color.RED);
            }
            else {
                CardConverter.map2.set(suit, Color_1.Color.BLACK);
            }
            current++;
        }
    }
    CardConverter.getInstance = function () {
        return CardConverter.CONVERTER;
    };
    CardConverter.toNumber = function (num) {
        return CardConverter.map.get(num);
    };
    CardConverter.toColor = function (suit) {
        return CardConverter.map2.get(suit);
    };
    CardConverter.map = new Map();
    CardConverter.map2 = new Map();
    CardConverter.CONVERTER = new CardConverter();
    return CardConverter;
}());
exports.CardConverter = CardConverter;
