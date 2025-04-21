var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../model/Card", "../model/CardNumber", "../model/CardConverter", "../model/Cascade", "../model/Suit", "../model/Tableau", "../model/Vector2"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Card_1 = require("../model/Card");
    var CardNumber_1 = require("../model/CardNumber");
    var CardConverter_1 = require("../model/CardConverter");
    var Cascade_1 = require("../model/Cascade");
    var Suit_1 = require("../model/Suit");
    var Tableau_1 = require("../model/Tableau");
    var Vector2_1 = require("../model/Vector2");
    var Game = /** @class */ (function () {
        function Game() {
            this.setUp();
        }
        Game.prototype.setUp = function () {
            this.tableaus = new Tableau_1.Tableau[Game.TABLEAU_SIZE];
            this.cards = new Card_1.Card[Game.DECK_SIZE];
            this.cascades = new Array();
            this.createTableaus();
            this.createCards();
            this.shuffle();
            this.checkForCascades();
        };
        Game.prototype.createTableaus = function () {
            for (var i = 1; i <= Game.TABLEAU_SIZE; i++) {
                this.tableaus[i - 1] = new Tableau_1.Tableau(i);
            }
        };
        Game.prototype.createCards = function () {
            var currentNumber = 0;
            var suit;
            for (suit in Suit_1.Suit) {
                var cardNumber;
                for (cardNumber in CardNumber_1.CardNumber) {
                    var createdCard = new Card_1.Card(CardConverter_1.CardConverter.toColor(suit), suit, new Vector2_1.Vector2(0, 0), cardNumber);
                    this.cards[currentNumber] = createdCard;
                    currentNumber++;
                    // System.out.println(createdCard.toString());
                }
            }
        };
        Game.prototype.getNumberList = function (max) {
            var nl = new Array();
            for (var i = 1; i < max + 1; i++) {
                nl.push(i);
            }
            return nl;
        };
        Game.prototype.shuffle = function () {
            var numbers = this.getNumberList(Game.DECK_SIZE);
            for (var i = 0; i < this.tableaus.length; i++) {
                var tab = this.tableaus[i];
                var offset = 1 - (i / 4);
                var maxSize = Game.MAX_TABLEAU_SIZE + offset;
                for (var j = 0; j < maxSize; j++) {
                    // if (numbers.size() > 0) {
                    var num = Math.floor(Math.random() * (numbers.length + 1));
                    //numbers.remove(num);
                    numbers = __spreadArray(__spreadArray([], numbers.slice(0, num), true), numbers.slice(num + 1), true);
                    this.cards[num].setPosition(new Vector2_1.Vector2(tab.getNumber(), tab.size()));
                    tab.add(this.cards[num]);
                    // }
                }
            }
        };
        Game.prototype.update = function () {
            this.checkForCascades();
        };
        Game.prototype.checkForCascades = function () {
            var tab;
            for (tab in this.tableaus) {
                var canCreate = true;
                var currentPos = 0;
                var currentCard;
                var previousCard = null;
                var currentCascade = null;
                var comp;
                for (comp in tab) {
                    currentCard = comp;
                    if (currentPos > 0 && currentCard != null && previousCard) {
                        var num1 = CardConverter_1.CardConverter.toNumber(currentCard.getNumber());
                        var num2 = CardConverter_1.CardConverter.toNumber(previousCard.getNumber());
                        if ((num1 - num2 == 1) && !(currentCard.getColor() == (previousCard.getColor()))
                            && currentCard.getPosition().getX() == previousCard.getPosition().getX()) {
                            // System.out.println(num1);
                            // System.out.println(num2);
                            // tab.remove(currentCard);
                            if (canCreate == true) {
                                currentCascade = new Cascade_1.Cascade(currentCard.getPosition());
                                // tab.replace(previousCard, currentCascade);
                                this.cascades.push(currentCascade);
                                currentCascade.addAtTop(previousCard);
                                currentCascade.addAtTop(currentCard);
                                canCreate = false;
                            }
                            else {
                                if (currentCascade != null) {
                                    currentCascade.addAtTop(currentCard);
                                    currentCascade.setPosition(currentCard.getPosition());
                                }
                            }
                        }
                        else {
                            currentCascade = null;
                            canCreate = true;
                        }
                    }
                    previousCard = currentCard;
                    currentPos++;
                }
            }
            // System.out.println("TEST");
            // System.out.println("TEST");
        };
        Game.DECK_SIZE = 52;
        Game.TABLEAU_SIZE = 8;
        Game.MAX_TABLEAU_SIZE = 6;
        return Game;
    }());
    exports.Game = Game;
});
