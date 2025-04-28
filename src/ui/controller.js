
import { Game } from './Game.js';
export class Controller {

    constructor() {
        this.game = new Game();
    }
    start() {
        return this.game;
    }
    canSelect(card, section, size) {
        return this.game.canSelect(card, section, size);
    }
    updateMove(from, to, card) {
        this.game.update(from, to, card, true)
    }
    validateMove(from, to, card, size) {
        return this.game.isValidMove(from, to, card, size)
    }
    handleUndo() {
        return this.game.undo();
    }
}