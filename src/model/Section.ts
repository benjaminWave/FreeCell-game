import { Color } from "./Color";
import { Component } from "./Component";
import { Suit } from "./Suit";
import { Vector2 } from "./Vector2";
import {Card} from "./Card";

export class Tableau implements Iterable<Card> {
    private cards: Card[];
    private number: number;

    public constructor(number: number) {
        this.number = number;
        this.cards = new Array();
    }

    public getNumber(): number {
        return this.number;
    }

    public add(comp: Card): void {
        this.cards.push(comp);
    }

    public remove(comp: Card): boolean {
        let indexRemoved = this.cards.indexOf(comp);
        if (indexRemoved>-1){
            this.cards =  [...this.cards.slice(0, indexRemoved), ...this.cards.slice(
                indexRemoved + 1)];
            return true;
        }
        return false;
    }

    public replace(original: Card, replacement: Card): void {
        this.cards[this.cards.indexOf(original) ]= replacement;
    }

    public getHead(): Card|null {
        return this.cards[this.cards.length-1];
    }

    public isEmpty(): boolean {
        return (this.cards.length==0);
    }

    public size(): number {
        return this.cards.length;
    }


    [Symbol.iterator](): Iterator<Card, any, any> {
        return new TableauIterator(this);
    }



}


export class TableauIterator implements Iterator<Card> {
    private currentPosition: number;

    public constructor(tab:Tableau) {
        this.currentPosition = tab.size() - 1;
    }
    next(...[value]: [] | [any]): IteratorResult<Card, any> {
        throw new Error("Method not implemented.");
    }
    return?(value?: any): IteratorResult<Card, any> {
        throw new Error("Method not implemented.");
    }
    throw?(e?: any): IteratorResult<Card, any> {
        throw new Error("Method not implemented.");
    }


    /*public boolean hasNext() {
        return currentPosition >= 0;
    }
    
    public Card next() {
        if (hasNext()) {
            return cards.get(currentPosition--);
        }
        return null;
    }*/
}
