import { Card } from "../model/Card";
import { CardNumber } from "../model/CardNumber";
import { CardConverter } from "../model/CardConverter";
import { Cascade } from "../model/Cascade";
import { Suit } from "../model/Suit";
import { Tableau } from "../model/Section";
import { Vector2 } from "../model/Vector2";

export class Game {
    private static DECK_SIZE = 52;
    private static TABLEAU_SIZE = 8;
    private static MAX_TABLEAU_SIZE = 6;
    private cascades: Cascade[];
    private tableaus: Tableau[];
    private cards: Card[];

    constructor() {

        this.setUp();
    }

    private setUp(): void {
        this.tableaus = new Array(Game.TABLEAU_SIZE);
        this.cards = new Array(Game.DECK_SIZE);
        this.cascades = new Array();
        this.createTableaus();
        this.createCards();
        this.shuffle();
        //this.checkForCascades();
    }
    private createTableaus(): void {
        for (var i = 1; i <= Game.TABLEAU_SIZE; i++) {
            this.tableaus[i - 1] = new Tableau(i);
        }
    }
    private createCards(): void {
        var currentNumber: number = 0;
        var suit: any;
        var suitList = Object.keys(Suit).filter(x => isNaN(Number(x)));
        var numberList = Object.keys(CardNumber).filter(x => isNaN(Number(x)));
        for (suit in suitList) {
            var cardNumber: any;
            for (cardNumber in numberList) {
                let createdCard: Card = new Card(CardConverter.toColor(suit), suit,
                    new Vector2(0, 0), cardNumber);
                this.cards[currentNumber] = createdCard;
                currentNumber++;
                // System.out.println(createdCard.toString());
            }
        }
    }

    private getNumberList(max: number): number[] {
        var nl: number[] = new Array();
        for (var i = 1; i < max + 1; i++) {
            nl.push(i);
        }
        return nl;
    }
    public shuffle(): void {
        var numbers: number[] = this.getNumberList(Game.DECK_SIZE);
        for (var i = 0; i < this.tableaus.length; i++) {
            var tab: Tableau = this.tableaus[i];
            var offset = 1 - (i / 4);
            var maxSize = Game.MAX_TABLEAU_SIZE + offset;
            var currentSize = 0
            for (var j = 0; j < maxSize; j++) {
                // if (numbers.size() > 0) {
                let num = Math.floor(Math.random() * (numbers.length + 1));
                //numbers.remove(num);
                numbers = [...numbers.slice(0, num), ...numbers.slice(
                    num + 1)];
                this.cards[num].setPosition(new Vector2(i+1, currentSize));
                currentSize++;
                tab.add(this.cards[num]);

                // }

            }
        }
    }

    public update(): void {
       // this.checkForCascades();
    }

    /*private checkForCascades(): void {
        var tab: any;
        for (tab in this.tableaus) {
            var canCreate = true;
            var currentPos = 0;
            var currentCard: Card;
            var previousCard: Card | null = null;
            var currentCascade: Cascade | null = null;
            var comp: any;
            for (comp in tab) {
                currentCard = comp;
                if (currentPos > 0 && currentCard != null && previousCard) {
                    let num1 = CardConverter.toNumber(currentCard.getNumber());
                    let num2 = CardConverter.toNumber(previousCard.getNumber());

                    if ((num1 - num2 == 1) && !(currentCard.getColor() == (previousCard.getColor()))
                        && currentCard.getPosition().getX() == previousCard.getPosition().getX()) {
                        // System.out.println(num1);
                        // System.out.println(num2);
                        // tab.remove(currentCard);
                        if (canCreate == true) {
                            currentCascade = new Cascade(currentCard.getPosition());

                            // tab.replace(previousCard, currentCascade);
                            this.cascades.push(currentCascade);
                            currentCascade.addAtTop(previousCard);
                            currentCascade.addAtTop(currentCard);
                            canCreate = false;
                        } else {
                            if (currentCascade != null) {
                                currentCascade.addAtTop(currentCard);
                                currentCascade.setPosition(currentCard.getPosition());
                            }


                        }
                    } else {
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
    }*/


}

