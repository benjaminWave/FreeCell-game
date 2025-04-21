import { CardNumber } from "./CardNumber";
import { Color } from "./Color";
import { Suit } from "./Suit";


export class CardConverter {

    private static map = new Map();
    private static map2 = new Map();
    private static CONVERTER = new CardConverter();
    public static getInstance() {
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
            } else {
                CardConverter.map2.set(suit, Color.BLACK);
            }
            current++;
        }
    }

    public static toNumber(num: number):number {
        return  CardConverter.map.get(num);
    }
    public static toColor(suit:Suit):Color {
        return  CardConverter.map2.get(suit);
    }
}
