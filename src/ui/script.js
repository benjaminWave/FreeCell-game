//TEST ADDING CARD STACKS, MOVING CARD STACKS then on to merging game to validate moves, then logging state of game to unndo
var button = document.getElementById('startButton')
var svgElement = document.getElementById('gameSVG')
var svgNS = "http://www.w3.org/2000/svg";
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
var isMoving = false;
function generateGame() {
    button.remove();
    //ADD FUNCTION TO CLEAR THE BOARD
    //Add timer
    createSection('freeCell', 4, 0, 0);
    createSection('foundCell', 4, cardSpacing * 4.5, 0);
    createSection('tableauArea', 8, 25, 145);
    createMover();
    startGame();
    // testAddCard('RED', 'HEARTS', 'ACE', 1);
    //testAddCard('BLACK', 'CLUBS', 'TWO', 3);
    //testAddCard('RED', 'DIAMONDS', 'JACK', 7);
}
async function startGame() {
    const response = await fetch('http://localhost:3500/game/start', {
        method: 'GET',

    });
    const responseData = await response.json();
    const game = responseData.object;
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
function createSection(tag, size, offsetX, offsetY) {
    var mainG = document.createElementNS(svgNS, 'g')
    mainG.setAttribute('id', tag);

    offsetX = offsetX + 55;
    offsetY = offsetY + 15;
    mainG.setAttribute('transform', `translate (${offsetX},${offsetY})`);
    svgElement.appendChild(mainG);
    for (var i = 1; i <= size; i++) {
        var newG = document.createElementNS(svgNS, 'g');
        newG.setAttribute('id', tag + 'pos' + i);
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
    svgElement.appendChild(mainG);
}

function addCard(color, suit, number, dest) {
    holder = document.getElementById(`tableauAreapos${dest}`)
    var intendedCard = cardFolder + color + suit + number + ".png"
    var holdG = document.createElementNS(svgNS, 'g');
    holdG.setAttribute('id', color + suit + number + 'Holder')
    holdG.setAttribute('class', 'cardObject')
    var img = document.createElementNS(svgNS, 'image');
    img.setAttribute('href', intendedCard);
    holdG.appendChild(img);
    scale(holdG, scaleX, scaleY, 0)
    mover.appendChild(holdG);
    transportCards(mover);
    
    let isDragging = false;
    scaleX = holder.getCTM().a;
    scaleY = holder.getCTM().d;
    ///INPUT BEGIN
    holdG.addEventListener('mousedown', (event) => {
        if (isMoving) return;
        holder = holdG.parentNode
        var mover = document.getElementById('mover');
        isDragging = true;
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
        var mover = document.getElementById('mover');
        holder = findClosestElement(draggedCard, holder, mouseX, mouseY)
        let offset = (31) * (holder.children.length - 1)
        animateMover(mover.getCTM().e, holder.getBoundingClientRect().x - 8, mover.getCTM().f, holder.getBoundingClientRect().y - 19 + offset, mover)
        draggedCard = null;
    }
}

function animateMover(sX, eX, sY, eY, element) {
    var t = 0;
    var duration = 100;
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
    for (var i = 0; i < tempArr.length; i++) {
        let currentCard = tempArr[i];
        holder.appendChild(currentCard);
        unScale(currentCard, holder.children.length - 1, true);
    }
}
function scale(element, X, Y, index) {
    let offset = (31) * (index - 1)
    element.setAttribute('transform', `translate (0,${offset})scale(${X},${Y})`)
}
function unScale(element, index, cond) {
    let offset = (31 / scaleX) * (index - 1) //offset y by a fourth of card size scaled to match card scale and get the index - base

    element.setAttribute('transform', `translate (0,${offset})scale(1,1)`);
    element.firstChild.removeAttribute('transform');

}

function moveToMouse(event, element) {
    let x = event.clientX - 37
    let y = event.clientY - 85
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

button.addEventListener("click", generateGame);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
