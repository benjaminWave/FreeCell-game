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
var lastY = 0;
var lastX = 0;
var scaleX = 0.4;
var scaleY = 0.4;
var holder = null;
function generateGame() {
    button.remove();
    //ADD FUNCTION TO CLEAR THE BOARD
    //Add timer
    createSection('freeCell', 4, 0, 0);
    createSection('foundCell', 4, cardSpacing * 4.5, 0);
    createSection('tableauArea', 8, 25, 145);
    testAddCard('RED', 'HEARTS', 'ACE', 1);
    testAddCard('BLACK', 'CLUBS', 'TWO', 3);
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

function testAddCard(color, suit, number, dest) {
    holder = document.getElementById(`tableauAreapos${dest}`)
    var intendedCard = cardFolder + color + suit + number + ".png"
    var holdG = document.createElementNS(svgNS, 'g');
    var img = document.createElementNS(svgNS, 'image');
    img.setAttribute('href', intendedCard);
    holdG.appendChild(img);
    holder.appendChild(holdG);
    let isDragging = false;
    scaleX = holder.getCTM().a;
    scaleY = holder.getCTM().d;
    ///INPUT BEGIN
    holdG.addEventListener('mousedown', (event) => {
        isDragging = true;
        draggedCard = holdG
        lastY = holdG.parentNode.parentNode.getCTM().f
        lastX = holdG.parentNode.parentNode.getCTM().e
        holdG.parentNode.removeChild(holdG);
        scale(holdG, scaleX, scaleY)
        holder.parentNode.parentNode.appendChild(holdG)

        moveToMouse(event, scaleX, scaleY, img)
        mouseX = event.clientX
        mouseY = event.clientY

    });
    /*//INPUT OVER
    document.addEventListener('mouseup', (event) => {
        isDragging = false;
        holder = findClosestElement(holdG, holder, mouseX, mouseY)
        holder.appendChild(holdG);
        unScale(holdG);


    })
    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            moveToMouse(event, scaleX, scaleY, img)
            mouseX = event.clientX
            mouseY = event.clientY
        }
    });*/
}

function handleMouseMove(event) {
    if (draggedCard) {
        var img = draggedCard.querySelector('image');
        moveToMouse(event, scaleX, scaleY, img)
        mouseX = event.clientX
        mouseY = event.clientY
    }
}

function handleMouseUp(event) {
    if (draggedCard) {
        holder = findClosestElement(draggedCard, holder, mouseX, mouseY)
        holder.appendChild(draggedCard);
        unScale(draggedCard, holder.children.length - 1);
        draggedCard = null;
    }
}

function scale(element, X, Y) {
    element.setAttribute('transform', `scale(${X},${Y})`)
}
function unScale(element, index) {
    let offset = (31 / scaleX) * (index - 1) //offset y by a fourth of card size scaled to match card scale and get the index - base
    element.setAttribute('transform', `translate (0,${offset})scale(1,1)`)
    element.firstChild.removeAttribute('transform');

}

function moveToMouse(event, scaleX, scaleY, img) {
    let x = event.clientX - 37
    let y = event.clientY - 105
    img.setAttribute('transform', `translate(${x / scaleX}, ${y / scaleY})`);
}
function findClosestElement(element, parent, X, Y) {
    const sections = document.getElementsByClassName('section');

    for (var i = 0; i < 16; i++) {
        //FIX THIS FOR STACKED SECTIONS
        if (isOverlapping(sections[i], X, Y)) {
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
