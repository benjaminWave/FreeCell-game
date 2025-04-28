import { Card } from "../model/Card.js";
import { CardNumber } from "../model/CardNumber.js";
import { CardConverter } from "../model/CardConverter.js";
import { Suit } from "../model/Suit.js";
import { Section } from "../model/Section.js";
import { Vector2 } from "../model/Vector2.js";
import { Event } from "../model/Log/Event.js";
import { EventLog } from "../model/Log/EventLog.js";

export class Game {
    constructor() {
        this.setUp();
    }
    setUp() {
        this.eventLog = new EventLog();
        this.tableaus = new Array(Game.TABLEAU_SIZE);
        this.foundations = new Array(Game.FOUNDATION_SIZE);
        this.cells = new Array(Game.FREECELL_SIZE);
        this.cards = new Array(Game.DECK_SIZE);
        this.sections = { 'foundCell': this.foundations, 'tableauArea': this.tableaus, 'freeCell': this.cells }
        this.cascades = new Array();
        this.createSection('tableauArea', Game.TABLEAU_SIZE);
        this.createSection('foundCell', Game.FOUNDATION_SIZE);
        this.createSection('freeCell', Game.FREECELL_SIZE);
        this.createCards();
        this.shuffle();
        //this.checkForCascades();
    }
    createSection(section, size) {
        for (var i = 1; i <= size; i++) {
            this.sections[section][i - 1] = new Section(i, section);
        }
    }

    createCards() {
        var currentNumber = 0;
        var suit;
        var suitList = Object.keys(Suit).filter(x => isNaN(Number(x)));
        var numberList = Object.keys(CardNumber).filter(x => isNaN(Number(x)));
        for (suit in suitList) {
            var cardNumber;
            for (cardNumber in numberList) {
                let createdCard = new Card(CardConverter.toColor(Suit[suit]), Suit[suit], new Vector2(0, 0), CardNumber[cardNumber]);
                this.cards[currentNumber] = createdCard;
                currentNumber++;
            }
        }
    }
    getNumberList(max) {
        var nl = new Array();
        for (var i = 0; i < max + 1; i++) {
            nl.push(i);
        }
        return nl;
    }
    shuffle() {
        var numbers = this.getNumberList(Game.DECK_SIZE);
        for (var i = 0; i < this.tableaus.length; i++) {
            var tab = this.tableaus[i];
            var offset = 1 - (i / 4);
            var maxSize = Game.MAX_TABLEAU_SIZE + offset;
            var currentSize = 0;
            for (var j = 0; j < maxSize; j++) {
                var num = Math.floor(Math.random() * (numbers.length - 1));
                this.cards[numbers[num]].setPosition(new Vector2(i + 1, currentSize));
                tab.add(this.cards[numbers[num]]);
                numbers = [...numbers.slice(0, num), ...numbers.slice(num + 1)];
                currentSize++;
            }
        }
    }

    getEmptySections(section) {
        let list = this.sections[section];
        let count = 0;
        for (section of list) {
            if (section.isEmpty()) count++;
        }
        return count;
    }
    parse(term) {
        const parts = term.split("pos");
        const prefix = parts[0];
        const number = parseInt(parts[1]);
        if (prefix == "foundCell") return this.foundations[number - 1];
        else if (prefix == "freeCell") return this.cells[number - 1];
        else return this.tableaus[number - 1];
    }
    formCard(card) {
        return new Card(card['color'], card['type'], new Vector2(card['x'], card['y']), card['num']);
    }
    update(from, to, cards, canLog) {
        var sectionFrom = this.parse(from);
        var sectionTo = this.parse(to);
        for (var card of cards) {
            var cardObject = this.formCard(card);
            sectionFrom.remove(this.getIndex(sectionFrom.cards, cardObject));
            cardObject.setPosition(new Vector2(sectionTo.getNumber(), sectionTo.cards.length))
            sectionTo.add(cardObject);
        }

        if (canLog) {
            const event = new Event(cards, from, to);
            this.eventLog.log(event);
        }


    }
    isValidMove(from, to, card, size) {
        var sectionTo = this.parse(to);
        card = this.formCard(card);
        var desiredColor = card.color;
        var desiredSuit = card.suit;
        var desiredNumber = CardConverter.toNumber(card.num);

        var valid = true;
        const type = sectionTo.getType();
        if (type === "foundCell") {
            if (size > 1) valid = false;
            else if (!sectionTo.isEmpty()) {
                var destCard = sectionTo.getHead()
                valid = (destCard.color === desiredColor && destCard.suit === desiredSuit && CardConverter.toNumber(destCard.num) === desiredNumber - 1)
            }
            else valid = (desiredNumber < 1);
        }
        else if (type === "freeCell") {
            if (size > 1) valid = false;
            else valid = (sectionTo.isEmpty());
        }
        else {
            if (!sectionTo.isEmpty()) {
                var destCard = sectionTo.getHead()
                valid = (destCard.color != desiredColor && CardConverter.toNumber(destCard.num) === desiredNumber + 1)
            }
        }


        return valid;
    }
    isWithinMaxCards(size) {
        const m = this.getEmptySections('tableauArea')
        const n = this.getEmptySections('freeCell')
        const c = (2 ** m) * (n + 1);
        return c >= size
    }
    canSelect(card, section, size) {
        if (section != "tableauArea") {
            if (size < 2) return true; //CHECK FOR SIZE IN CASE FREE CELL OR FOUNDATION CASCADE
            return false;
        }
        if (this.isWithinMaxCards(size)) return this.isCascade(this.tableaus[card['x'] - 1], card);
        return false;

    }
    getIndex(array, card) {

        for (var i = 0; i < array.length; i++) {

            if (this.cardEquals(array[i], card)) return i;
        }
        return -1;
    }
    cardEquals(card1, card2) {
        return card1.num === card2.num && card1.suit === card2.suit //&& card1.position.getX() === card2.position.getX() && card1.position.getY() === card2.position.getY();
    }
    isCascade(tab, card) {
        card = this.formCard(card);
        var index = this.getIndex(tab.cards, card);
        if (index === -1) return false;
        var cards = tab.cards;
        var desiredColor = card.color;
        var desiredNumber = CardConverter.toNumber(card.num);
        for (var i = index + 1; i < cards.length; i++) {
            let thisColor = cards[i].color;
            let thisNumber = CardConverter.toNumber(cards[i].num);
            if (thisColor != desiredColor && thisNumber == desiredNumber - 1) {
                desiredColor = thisColor;
                desiredNumber = thisNumber;
            }
            else return false;
        }
        return true;
    }
    undo() {
        const event = this.eventLog.reverse();
        if (event != null) {
            const cards = event.getComponent();

            let cardPack = new Array()
            for (var card of cards) {
                cardPack.push(card.color + card.type + card.num + "Holder")
            }
            this.update(event.getNewPos(), event.getOriginalPos(), event.getComponent(), false)
            return { 'success': true, 'from': event.getOriginalPos(), 'to': event.getNewPos(), 'card': cardPack } // card is the html not js
        }
        else return { 'success': false }
    }
    checkGameOver() {
        let sum = 0;
        for (var found of this.foundations) {
            sum += found.cards.length;
        }
        return sum === Game.DECK_SIZE;
    }
}
Game.DECK_SIZE = 52;
Game.TABLEAU_SIZE = 8;
Game.FOUNDATION_SIZE = 4;
Game.FREECELL_SIZE = 4;
Game.MAX_TABLEAU_SIZE = 6;
