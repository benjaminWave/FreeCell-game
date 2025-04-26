import { Card } from "../model/Card.js";
import { CardNumber } from "../model/CardNumber.js";
import { CardConverter } from "../model/CardConverter.js";
import { Suit } from "../model/Suit.js";
import { Tableau } from "../model/Tableau.js";
import { Vector2 } from "../model/Vector2.js";
export class Game {
    constructor() {
        this.setUp();
    }
    setUp() {
        this.tableaus = new Array(Game.TABLEAU_SIZE);
        this.cards = new Array(Game.DECK_SIZE);
        this.cascades = new Array();
        this.createTableaus();
        this.createCards();
        this.shuffle();
        //this.checkForCascades();
    }
    createTableaus() {
        for (var i = 1; i <= Game.TABLEAU_SIZE; i++) {
            this.tableaus[i - 1] = new Tableau(i);
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
                // System.out.println(createdCard.toString());
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
                var num = Math.floor(Math.random() * (numbers.length-1));
                //console.log(numbers[num]);
                this.cards[numbers[num]].setPosition(new Vector2(i + 1, currentSize));
                tab.add(this.cards[numbers[num]]);
                numbers = [...numbers.slice(0, num), ...numbers.slice(num + 1)];
                currentSize++;
            }
        }
    }
    update() {
        // this.checkForCascades();
    }
}
Game.DECK_SIZE = 52;
Game.TABLEAU_SIZE = 8;
Game.MAX_TABLEAU_SIZE = 6;
