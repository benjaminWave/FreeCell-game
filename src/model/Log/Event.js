export class Event {
    constructor(card, from, to) {
        this.card = card;
        this.from = from;
        this.to = to;
    }
    getComponent() {
        return this.card;
    }
    getOriginalPos() {
        return this.from;
    }
    getNewPos() {
        return this.to;
    }
}