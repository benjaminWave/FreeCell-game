import { Component } from "./Component.js";
export class Cascade extends Component {
    constructor(position) {
        super();
        this.position = position;
        this.cards = new Array();
    }
    setPosition(newPosition) {
        this.position = newPosition;
    }
    getHead() {
        return this.cards[this.cards.length - 1];
    }
    getTail() {
        return this.cards[0];
    }
    addAtTop(card) {
        this.cards.push(card);
    }
    isEmpty() {
        return (this.cards.length == 0);
    }
    size() {
        return this.cards.length;
    }
    addAtBottom(card) {
        this.cards.push(card);
    }
    getPosition() {
        return this.position;
    }
    remove(card) {
        let indexRemoved = this.cards.indexOf(card);
        if (indexRemoved > -1) {
            this.cards = [...this.cards.slice(0, indexRemoved), ...this.cards.slice(indexRemoved + 1)];
            return true;
        }
        return false;
    }
    toString() {
        var str = new Array();
        var card;
        for (card in this.cards) {
            str.push(card.toString() + " ");
        }
        return str.toString();
    }
    removeAt(position) {
        var returned = new Cascade(this.getPosition());
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
