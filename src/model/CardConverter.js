import { CardNumber } from "./CardNumber.js";
import { Color } from "./Color.js";
import { Suit } from "./Suit.js";
export class CardConverter {
    static getInstance() {
        return CardConverter.CONVERTER;
    }
    constructor() {
        var current = 1;
        for (let num in Object.values(CardNumber)) {
            CardConverter.map.set(num, current);
            current++;
        }
        current = 0;
        for (let suit in Object.values(Suit)) {
            if (current % 2 == 0) {
                CardConverter.map2.set(suit, Color.RED);
            }
            else {
                CardConverter.map2.set(suit, Color.BLACK);
            }
            current++;
        }
    }
    static toNumber(num) {
        return CardNumber[num];
    }
    static toColor(suit) {
        if (suit === "DIAMONDS" || suit === "HEARTS") return "RED";
        return "BLACK";
    }
}
CardConverter.map = new Map();
CardConverter.map2 = new Map();
CardConverter.CONVERTER = new CardConverter();
