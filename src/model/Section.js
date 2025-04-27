export class Section {
    constructor(number,type) {
        this.number = number;
        this.cards = new Array();
        this.type = type;
    }
    getNumber() {
        return this.number;
    }
    getType(){
        return this.type;
    }
    add(comp) {
        this.cards.push(comp);
    }
    remove(indexRemoved) {
        if (indexRemoved > -1) {
            this.cards = [...this.cards.slice(0, indexRemoved), ...this.cards.slice(indexRemoved + 1)];
            return true;
        }
        return false;
    }
    replace(original, replacement) {
        this.cards[this.cards.indexOf(original)] = replacement;
    }
    getHead() {
        return this.cards[this.cards.length - 1];
    }
    isEmpty() {
        return (this.cards.length == 0);
    }
    size() {
        return this.cards.length;
    }
    [Symbol.iterator]() {
        return new TableauIterator(this);
    }
}
export class TableauIterator {
    constructor(tab) {
        this.currentPosition = tab.size() - 1;
    }
    next(...[value]) {
        throw new Error("Method not implemented.");
    }
    return(value) {
        throw new Error("Method not implemented.");
    }
    throw(e) {
        throw new Error("Method not implemented.");
    }
}
