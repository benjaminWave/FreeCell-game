
import { Game } from './Game.js';
export class Controller {

    constructor() {
        this.game = null;
    }
    start() {
        this.game = new Game();
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
    handleCheckGameOver() {
        return this.game.checkGameOver();
    }
    handleBestMove(from, card,size) {
        return this.game.findBestMove(from, card,size);
    }
    handleAutoAssign(){
        return this.game.autoAssign();
    }
}