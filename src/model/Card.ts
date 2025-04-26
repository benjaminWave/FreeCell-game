import { Color } from "./Color";
import { Component } from "./Component";
import { Suit } from "./Suit";
import { Vector2 } from "./Vector2";



export class Card extends Component {
    private color: Color;
    private suit: Suit;
    private position: Vector2;
    private num: number;
  

    constructor(color: Color, type: Suit, position: Vector2, num: number) {
        super()
        this.color = color;
        this.suit = type;
        this.position = position;
        this.num = num;
    }

    // @Override
    public setPosition(newPosition: Vector2):void {
        this.position = newPosition;
    }

    //@Override
    public getPosition(): Vector2 {
        return this.position;
    }

    public getColor(): Color {
        return this.color;
    }

    public getSuit(): Suit {
        return this.suit;
    }

    public getNumber():number {
        return this.num;
    }

    // @Override
    public getHead():Component {
        return this;
    }

    public toString(): string {
        return "Card is: " + this.getColor().toString() + this.num.toString() + this.suit.toString()
            + "at Position: " + this.position.getX() + " " + this.position.getY();
    }

    
}

