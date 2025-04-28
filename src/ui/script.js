//  unndo
// maybe make dragging only left click?
// add an option to auto assign if foundation can be played
//fix document sizing
var button = document.getElementById('startButton')
var svgElement = document.getElementById('gameSVG')
var svgNS = "http://www.w3.org/2000/svg";
const htmlNS = "http://www.w3.org/1999/xhtml";
var cardScale = 0.4
var cardSpacing = 100;
const placeHolderIMG = '../imgs/placeholder.png';
const cardFolder = '../imgs/cards/';
var draggedCard = null;

var mouseX = 0;
var mouseY = 0

var scaleX = 0.4;
var scaleY = 0.4;
var holder = null;
var from = null;
var isMoving = false;
var isSelected = false;
const stackOffset = 31;
import { Controller } from "./controller.js";
const controller = new Controller();
function generateGame() {
    button.remove();
    //ADD FUNCTION TO CLEAR THE BOARD
    //Add timer
    createSection('freeCell', 4, 0, 0, 0);
    createSection('foundCell', 4, cardSpacing * 4.5, 0, 0);
    createSection('tableauArea', 8, 25, 145, 1);
    createMover();
    createWoodPanel();
    createButtons();
    startGame();
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



function createSection(tag, size, offsetX, offsetY, stackable) {
    var mainG = document.createElementNS(svgNS, 'g')
    mainG.setAttribute('id', tag);

    offsetX = offsetX + 55;
    offsetY = offsetY + 15;
    mainG.setAttribute('transform', `translate (${offsetX},${offsetY})`);
    svgElement.appendChild(mainG);
    for (var i = 1; i <= size; i++) {
        var newG = document.createElementNS(svgNS, 'g');
        newG.setAttribute('id', tag + 'pos' + i);
        newG.setAttribute('pos', i);
        newG.setAttribute('tag', tag);
        newG.setAttribute('stackable', stackable);
        newG.setAttribute('class', 'section')
        newG.setAttribute('transform', `translate (${cardSpacing * (i - 1)},0) scale(${cardScale},${cardScale})`);
        var img = document.createElementNS(svgNS, 'image');
        img.setAttribute('href', placeHolderIMG);
        newG.appendChild(img);
        mainG.appendChild(newG);
    }

}
function createMover() {
    var mainG = document.createElementNS(svgNS, 'g')
    mainG.setAttribute('id', 'mover');
    mainG.setAttribute('stackable', 1);
    svgElement.appendChild(mainG);
}

function createWoodPanel() {
    var mainG = document.createElementNS(svgNS, 'g');
    mainG.setAttribute('id', 'panel');
    let offsetX = 1243;

    mainG.setAttribute('transform', `translate (${offsetX},${0})`);
    var rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('class', 'panel');

    mainG.appendChild(rect);
    svgElement.appendChild(mainG);
}
function createButtons() {
    const mainDiv = document.getElementById('background');

    const buttonUndo = document.createElement('button');
    buttonUndo.setAttribute('id', "undoButton");
    buttonUndo.setAttribute('class', "startButton");
    buttonUndo.setAttribute('style', "position: absolute;");
    buttonUndo.innerHTML = 'Undo'
    buttonUndo.addEventListener("click", undo);

    mainDiv.append(buttonUndo);
}
function getCard(element, x, y) {
    return { 'color': element.getAttribute('color'), 'type': element.getAttribute('suit'), 'num': element.getAttribute('number'), 'x': x, 'y': y };
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
    scaleX = holder.getCTM().a;
    scaleY = holder.getCTM().d;
    ///INPUT BEGIN
    holdG.addEventListener('mousedown', (event) => {
        if (isMoving) return;
        if (isSelected) return;
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
        moveToMouse(event, mover)
        mouseX = event.clientX
        mouseY = event.clientY

    });
}

function getIndex(parent, element) {
    Array.from(parent.children).indexOf(element)
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function collectCards(element, start) {
    let tempArr = [];
    for (var i = start; i < element.children.length; i++) {
        var currentCard = element.children[i];
        tempArr.push(currentCard)
    }
    return tempArr;
}
function handleMouseMove(event) {
    if (draggedCard) {
        var mover = document.getElementById('mover');

        moveToMouse(event, mover)
        mouseX = event.clientX
        mouseY = event.clientY
    }
}

function handleMouseUp(event) {
    if (draggedCard) {
        isMoving = true
        isSelected = false;
        var mover = document.getElementById('mover');
        from = holder;

        holder = findClosestElement(draggedCard, holder, mouseX, mouseY);


        if (holder != from) {
            let x = from.getAttribute('pos');
            let y = draggedCard.getAttribute('y');
            const card = getCard(draggedCard, x, y)
            if (!controller.validateMove(from.getAttribute('id'), holder.getAttribute('id'), card, mover.children.length)) holder = from;
            //else  controller.updateMove(from.getAttribute('id'), holder.getAttribute('id'), card);
        }
        let offset = (stackOffset) * (holder.children.length - 1) * holder.getAttribute('stackable')
        const mainDiv = document.getElementById("background").getBoundingClientRect();
        animateMover(mover.getCTM().e, holder.getBoundingClientRect().x - mainDiv.x, mover.getCTM().f, holder.getBoundingClientRect().y - 19 + offset, mover)
        draggedCard = null;
    }
}

function animateMover(sX, eX, sY, eY, element) {
    var t = 0;
    var duration = 150;
    let startTime = performance.now();

    function update() {
        let currentTime = performance.now();
        t = (currentTime - startTime) / duration;
        if (t >= 1) {
            t = 1;
            isMoving = false
            transportCards(mover)
        }
        let x = lerp(sX, eX, t);
        let y = lerp(sY, eY, t);
        element.setAttribute('transform', `translate(${x},${y})`);
        if (t < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
function transportCards(mover) {
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
    if (holder != from) {
        controller.updateMove(from.getAttribute('id'), holder.getAttribute('id'), cardPack);
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

function moveToMouse(event, element) {
    const mainDiv = document.getElementById("background").getBoundingClientRect();
    let x = (event.clientX + window.scrollX - (mainDiv.x - 8)) - element.getBoundingClientRect().width / 2
    let y = (event.clientY + window.scrollY) - element.getBoundingClientRect().height / 2
    element.setAttribute('transform', `translate(${x}, ${y})`); // previously x/scaleX
}
function findClosestElement(element, parent, X, Y) {
    const sections = document.getElementsByClassName('section');

    for (var i = 0; i < 16; i++) { //16 spots in the game, for future reference
        //TEST THIS FOR STACKED SECTIONS
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

function undo() {
    if (isMoving) return;
    if (isSelected) return;
    const response = controller.handleUndo();
    if (response['success']) {
        const thisCardID = response['card'];
        const thisCard = document.getElementById(thisCardID);

    }
}

button.addEventListener("click", generateGame);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
