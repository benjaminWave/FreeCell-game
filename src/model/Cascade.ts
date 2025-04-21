
import { Card } from "./Card";
import { Component } from "./Component";
import { Vector2 } from "./Vector2";
export class Cascade extends Component {
    private position: Vector2;
    private cards: Card[];

    constructor(position: Vector2) {
        super();
        this.position = position;
        this.cards = new Array();
    }

    public setPosition(newPosition: Vector2): void {
        this.position = newPosition;
    }

    public getHead(): Card {
        return this.cards[this.cards.length - 1];
    }
    public getTail(): Card {
        return this.cards[0];
    }

    public addAtTop(card: Card): void {
        this.cards.push(card);
    }
    public isEmpty(): boolean {
        return (this.cards.length == 0);
    }

    public size(): number {
        return this.cards.length;
    }

    public addAtBottom(card: Card): void {
        this.cards.push(card);
    }

    public getPosition(): Vector2 {
        return this.position;
    }
    private remove(card: Card): boolean {
        let indexRemoved = this.cards.indexOf(card);
        if (indexRemoved > -1) {
            this.cards = [...this.cards.slice(0, indexRemoved), ...this.cards.slice(
                indexRemoved + 1)];
            return true;
        }
        return false;
    }

    public toString(): String {
        var str: String[] = new Array();
        var card: any;
        for (card in this.cards) {
            str.push(card.toString() + " ");
        }
        return str.toString();
    }

    public removeAt(position: number): Component {
        var returned: Cascade = new Cascade(this.getPosition());
        for (var i = position; i < this.size(); i++) {
            if (position + 1 == this.size()) {
                return this.cards[position];
            }
            returned.addAtBottom(this.cards[i]);
            this.remove(this.cards[i]);

        }
        return returned;
    }
}
