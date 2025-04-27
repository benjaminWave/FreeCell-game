"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Card_1 = require("../model/Card");
var CardNumber_1 = require("../model/CardNumber");
var CardConverter_1 = require("../model/CardConverter");
var Suit_1 = require("../model/Suit");
var Color_1 = require("../model/Color");
var Tableau_1 = require("../model/Tableau");
var Vector2_1 = require("../model/Vector2");
var Game = /** @class */ (function () {
    function Game() {
        this.setUp();
    }
    Game.prototype.setUp = function () {
        this.tableaus = new Array(Game.TABLEAU_SIZE);
        this.cards = new Array(Game.DECK_SIZE);
        this.cascades = new Array();
        this.createTableaus();
        this.createCards();
        this.shuffle();
        //this.checkForCascades();
    };
    Game.prototype.createTableaus = function () {
        for (var i = 1; i <= Game.TABLEAU_SIZE; i++) {
            this.tableaus[i - 1] = new Tableau_1.Tableau(i);
        }
    };
    Game.prototype.createCards = function () {
        var currentNumber = 0;
        var suit;
        var suitList = Object.keys(Suit_1.Suit).filter(function (x) { return isNaN(Number(x)); });
        var numberList = Object.keys(CardNumber_1.CardNumber).filter(function (x) { return isNaN(Number(x)); });
        for (suit in suitList) {
            var cardNumber;
            for (cardNumber in numberList) { // Access by Suit_1.Suit[suit]
                var createdCard = new Card_1.Card(CardConverter_1.CardConverter.toColor(Suit_1.Suit[suit]), Suit_1.Suit[suit], new Vector2_1.Vector2(0, 0), CardNumber_1.CardNumber[cardNumber]);

                this.cards[currentNumber] = createdCard;
                currentNumber++;
                // System.out.println(createdCard.toString());
            }
        }
    };
    Game.prototype.getNumberList = function (max) {
        var nl = new Array();
        for (var i = 0; i < max + 1; i++) {
            nl.push(i);
        }
        return nl;
    };
    Game.prototype.shuffle = function () {
        var numbers = this.getNumberList(this.cards.length - 1);
        for (var i = 0; i < this.tableaus.length; i++) {
            var tab = this.tableaus[i];
            var offset = 1 - (i / 4);
            var maxSize = Game.MAX_TABLEAU_SIZE + offset;
            var currentSize = 0
            for (var j = 0; j < maxSize; j++) {
                // if (numbers.size() > 0) {
                var num = Math.floor(Math.random() * (numbers.length));
                //numbers.remove(num);
                this.cards[numbers[num]].setPosition(new Vector2_1.Vector2(i + 1, currentSize));
                tab.add(this.cards[numbers[num]]);
                numbers = [...numbers.slice(0, num), ...numbers.slice(num + 1)];
                //console.log(numbers)

                currentSize++;

                // }
            }
        }
    };
    Game.prototype.update = function () {
        // this.checkForCascades();
    };

    Game.prototype.canSelect = function (card, posX, posY, section) {
        if (section != "tableauArea") return true;
        return this.isCascade(this.tableaus[posX - 1], card, posY);
    }
    Game.prototype.getIndex = function (array, card) {
        for (var i = 0; i < array.length; i++) {
            if (this.cardEquals(array[i], card)) return i;
        }
        return -1;
    }
    Game.prototype.cardEquals = function (card1, card2) {
        return card1.num === card2.num && card1.suit === card2.suit && card1.pos === card2.pos;
    }
    Game.prototype.isCascade = function (tab, card, pos) {
        card = Card_1.Card(card['color'], card['type'], pos, card['num']);
        var index = this.getIndex(tab, card);
        var cards = tab.cards;
        var desiredColor = card.color;
        var desiredNumber = CardConverter_1.CardConverter.toNumber(card.num);
        for (var i = index + 1; i < cards.length; i++) {
            let thisColor = cards[i].color;
            let thisNumber = CardConverter_1.CardConverter.toNumber(cards[i].num);
            if (thisColor != desiredColor && thisNumber == desiredNumber + 1) {
                desiredColor = thisColor;
                desiredNumber = thisNumber;
            }
            else return false;
        }
        return true;
    }

    Game.DECK_SIZE = 52;
    Game.TABLEAU_SIZE = 8;
    Game.MAX_TABLEAU_SIZE = 6;
    return Game;
}());
exports.Game = Game;
