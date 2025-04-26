
import { Game } from './Game.js';


export class Controller {

    constructor() {
        this.game = new Game();
    }
    start() {
        return this.game;
    }
    canSelect(card,posX,posY, section){
        return this.game.canSelect(card,posX,posY, section);
    }
}