
import { createSection, createMover,createWoodPanel,createButtons,addMisc,loadGameOverScreen } from './ui.js';
var button = document.getElementById('startButton')
var svgElement = document.getElementById('gameSVG')
var svgNS = "http://www.w3.org/2000/svg";
var cardSpacing = 100;
const cardFolder = '../imgs/cards/';
var draggedCard;
var mouseX;
var mouseY;
var scaleX = 0.4;
var scaleY = 0.4;
var holder;
var from;
var isMoving;
var isSelected;
var gameOver;
var start;
var end;
var timeElapsed;
var startTime;
var moveCount;
var canAutoAssign;
const clickTime = 130;
const stackOffset = 31;


import { Controller } from "./controller.js";
const controller = new Controller();

function generateGame() {
    button.remove();
    generateGameGeneral();
}
function generateGameGeneral() {
    draggedCard = null;
    holder = null;
    from = null;
    isMoving = false;
    isSelected = false;
    gameOver = false;
    mouseX = 0;
    mouseY = 0;
    timeElapsed = 0;
    moveCount = 0;
    canAutoAssign = true;
    startTime = new Date().getTime();
    createSection('freeCell', 4, 0, 0, 0);
    createSection('foundCell', 4, cardSpacing * 4.5, 0, 0);
    createSection('tableauArea', 8, 25, 145, 1);
    createMover();
    createWoodPanel();
    createButtons();
    addMisc();
    startGame();
    requestAnimationFrame(everyFrame);
}
function startGame() {
    const game = controller.start();
    const tableaus = game.tableaus
    for (var i = 0; i < tableaus.length; i++) {
        const cards = tableaus[i].cards;
        for (var j = 0; j < cards.length; j++) {
            let pos = i + 1;
            let card = cards[j];
            addCard(card.color, card.suit, card.num, pos);
        }
    }
}

function addCard(color, suit, number, dest) {
    holder = document.getElementById(`tableauAreapos${dest}`)
    from = holder;
    var intendedCard = cardFolder + color + suit + number + ".png"
    var holdG = document.createElementNS(svgNS, 'g');
    holdG.setAttribute('id', color + suit + number + 'Holder')
    holdG.setAttribute('class', 'cardObject')
    holdG.setAttribute('color', color)
    holdG.setAttribute('suit', suit)
    holdG.setAttribute('number', number)
    holdG.setAttribute('y', mover.children.length)
    var img = document.createElementNS(svgNS, 'image');
    img.setAttribute('href', intendedCard);
    holdG.appendChild(img);
    scale(holdG, scaleX, scaleY, 0)
    mover.appendChild(holdG);
    transportCards(mover);
    //START INPUT
    holdG.addEventListener('mousedown', (event) => {
        if (isMoving) return;
        if (isSelected) return;
        if (gameOver) return;
        handleMouseDown(event, holdG);

    });
}

function handleMouseDown(event, card) {
    let holdG = card;
    start = new Date().getTime();
    holder = holdG.parentNode
    let x = holder.getAttribute('pos');
    let y = holdG.getAttribute('y');
    var result = controller.canSelect(getCard(holdG, x, y), holder.getAttribute('tag'), holder.children.length - y);
    if (!result) return;
    var mover = document.getElementById('mover');
    isSelected = true;
    draggedCard = holdG
    let parent = holdG.parentNode
    let index = (Array.prototype.indexOf.call(parent.children, holdG));
    let tempArr = collectCards(parent, index)
    for (var i = 0; i < tempArr.length; i++) {
        var currentCard = tempArr[i];
        parent.removeChild(currentCard);
        scale(currentCard, scaleX, scaleY, i)
        mover.appendChild(currentCard);
    }
    moveTo(event.clientX, event.clientY, mover)
    mouseX = event.clientX
    mouseY = event.clientY
}

function handleMouseMove(event) {
    if (draggedCard) {
        var mover = document.getElementById('mover');

        moveTo(event.clientX, event.clientY, mover)
        mouseX = event.clientX
        mouseY = event.clientY
    }
}

function handleMouseUp(event) {
    if (draggedCard) {
        end = new Date().getTime();
        isMoving = true
        isSelected = false;
        var mover = document.getElementById('mover');
        from = holder;
        holder = findClosestElement(draggedCard, holder, mouseX, mouseY);
        let x = from.getAttribute('pos');
        let y = draggedCard.getAttribute('y');
        const card = getCard(draggedCard, x, y)

        if (holder != from) {

            if (!controller.validateMove(from.getAttribute('id'), holder.getAttribute('id'), card, mover.children.length)) holder = from;
            else updateMoveCounter(); // case of validation drag
        }
        else if ((end - start) < clickTime) {
            var bestPosTag = controller.handleBestMove(from.getAttribute('id'), card, mover.children.length);
            if (bestPosTag) {
                holder = document.getElementById(bestPosTag);
                updateMoveCounter(); //case of click
            }
        }
        prepareAnimate(true, mover);

    }
}

function prepareAnimate(notify, mover) {
    let offset = (stackOffset) * (holder.children.length - 1) * holder.getAttribute('stackable')
    const mainDiv = document.getElementById("background").getBoundingClientRect();
    animateMover(mover.getCTM().e, holder.getBoundingClientRect().x - mainDiv.x, mover.getCTM().f, holder.getBoundingClientRect().y - 19 + offset, mover, notify)
    draggedCard = null;
}

function animateMover(sX, eX, sY, eY, element, canNotify) {
    var t = 0;
    var duration = 150;
    let startTime = new Date().getTime();
    function update() {
        let currentTime = new Date().getTime();
        t = (currentTime - startTime) / duration;
        if (t >= 1) {
            t = 1;
            isMoving = false
            transportCards(mover, canNotify)
        }
        let x = lerp(sX, eX, t);
        let y = lerp(sY, eY, t);
        element.setAttribute('transform', `translate(${x},${y})`);
        if (t < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
function transportCards(mover, canNotify) {
    let tempArr = collectCards(mover, 0)
    let cardPack = new Array();
    for (var i = 0; i < tempArr.length; i++) {
        let currentCard = tempArr[i];
        if (holder != from) {
            let x = from.getAttribute('pos');
            let y = currentCard.getAttribute('y');
            const card = getCard(currentCard, x, y);
            cardPack.push(card);

        }
        currentCard.setAttribute('y', holder.children.length)
        holder.appendChild(currentCard);
        unScale(currentCard, holder.children.length - 1, true, holder.getAttribute('stackable'));
    }
    if (holder != from && canNotify) {
        controller.updateMove(from.getAttribute('id'), holder.getAttribute('id'), cardPack); //notify game of movement
    }
}

function scale(element, X, Y, index) {
    let offset = (stackOffset) * (index - 1)
    element.setAttribute('transform', `translate (0,${offset})scale(${X},${Y})`)
}
function unScale(element, index, cond, stackable) {
    let offset = (stackOffset / scaleX) * (index - 1) * stackable //offset y by a fourth of card size scaled to match card scale and get the index - base

    element.setAttribute('transform', `translate (0,${offset})scale(1,1)`);
    element.firstChild.removeAttribute('transform');

}

function moveTo(X, Y, element) {
    const mainDiv = document.getElementById("background").getBoundingClientRect();
    let x = (X + window.scrollX * 0 - (mainDiv.x - 0)) - element.getBoundingClientRect().width / 2
    let y = (Y + window.scrollY * 0) - element.getBoundingClientRect().height / 2
    element.setAttribute('transform', `translate(${x}, ${y})`);
}
function findClosestElement(element, parent, X, Y) {
    const sections = document.getElementsByClassName('section');
    for (var i = 0; i < 16; i++) { //16 spots in the game
        let topIndex = sections[i].children.length - 1
        if (isOverlapping(sections[i].children[topIndex], X, Y)) {
            return sections[i];
        }
    }
    return parent;
}
function isOverlapping(e1, X, Y) {
    var rect2 = e1.getBoundingClientRect();
    return (X > rect2.left && X < rect2.right && Y < rect2.bottom && Y > rect2.top)

}
function tryAutoAssign() {
    if (isMoving) return;
    if (isSelected) return;
    if (gameOver) return;
    var mover = document.getElementById('mover');
    const response = controller.handleAutoAssign();
    if (response['success']) {
        handleAutoMover(true, mover, response, true);
    }
}

function handleAutoMover(cond, mover, response, specifyFrom) {
    isMoving = true
    const cards = response['card'];
    draggedCard = document.getElementById(cards[0]);
    const middleX = draggedCard.getBoundingClientRect().x
    const middleY = draggedCard.getBoundingClientRect().y
    updateMoveCounter();
    moveTo(middleX, middleY, mover)
    from = (specifyFrom) ? draggedCard.parentNode : document.getElementById(response['to']);
    holder = document.getElementById(response['from']);
    for (var j = 0; j < cards.length; j++) {
        let cardID = cards[j];
        let card = document.getElementById(cardID);
        from.removeChild(card);
        scale(card, scaleX, scaleY, j)
        mover.appendChild(card);
    }
    prepareAnimate(cond, mover);
}
function trackTime() {
    timeElapsed = new Date().getTime() - startTime;
    const element = document.getElementById('timer');
    var sec = Math.floor(timeElapsed / 1000) % 60;
    var min = Math.floor(timeElapsed / 60000);
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
    element.innerHTML = `Time: ${min}:${sec}`;
}
function updateMoveCounter() {
    document.getElementById('moveCounter').innerHTML = `Moves: ${++moveCount}`;
}

function everyFrame() {
    if (gameOver) return;
    if (canAutoAssign) tryAutoAssign();
    trackTime();
    gameOver = checkGameProgress();
    if (gameOver && !isMoving && !isSelected) loadGameOverScreen();
    else requestAnimationFrame(everyFrame);

}
function checkGameProgress() {
    return controller.handleCheckGameOver();
}


function lerp(a, b, t) {
    return a + (b - a) * t;
}

//Returns an object representation of the SVG card
function getCard(element, x, y) {
    return { 'color': element.getAttribute('color'), 'type': element.getAttribute('suit'), 'num': element.getAttribute('number'), 'x': x, 'y': y };
}

//Helper function to collect an array of cards from a section, element starting at index start
function collectCards(element, start) {
    let tempArr = [];
    for (var i = start; i < element.children.length; i++) {
        var currentCard = element.children[i];
        tempArr.push(currentCard)
    }
    return tempArr;
}

export function undo() {
    if (isMoving) return;
    if (isSelected) return;
    if (gameOver) return;
    var mover = document.getElementById('mover');
    const response = controller.handleUndo();
    if (response['success']) {
        handleAutoMover(false, mover, response, false);
    }
}

export function newGame() {
    if (isMoving) return;
    if (isSelected) return;
    svgElement.innerHTML = '';
    document.getElementById('otherFeatures').innerHTML = '';
    generateGameGeneral();
}
export function enableAutoAssign() {
    const buttonAssign = document.getElementById('assignButton');
    if (canAutoAssign) {
        buttonAssign.innerHTML = 'Enable'
        canAutoAssign = false;
    }
    else {
        buttonAssign.innerHTML = 'Disable'
        canAutoAssign = true;
    }
}
export function reportBug(){

}

button.addEventListener("click", generateGame);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
