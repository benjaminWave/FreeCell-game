import { Component } from "./Component.js";
export class Card extends Component {
    constructor(color, type, position, num) {
        super();
        this.color = color;
        this.suit = type;
        this.position = position;
        this.num = num;
    }
    // @Override
    setPosition(newPosition) {
        this.position = newPosition;
    }
    //@Override
    getPosition() {
        return this.position;
    }
    getColor() {
        return this.color;
    }
    getSuit() {
        return this.suit;
    }
    getNumber() {
        return this.num;
    }
    // @Override
    getHead() {
        return this;
    }
    toString() {
        return "Card is: " + this.getColor().toString() + this.num.toString() + this.suit.toString()
            + "at Position: " + this.position.getX() + " " + this.position.getY();
    }
}
