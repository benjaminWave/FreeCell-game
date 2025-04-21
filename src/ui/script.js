//TEST ADDING CARD STACKS, MOVING CARD STACKS then on to merging game to validate moves, then logging state of game to unndo
var button = document.getElementById('startButton')
var svgElement = document.getElementById('gameSVG')
var svgNS = "http://www.w3.org/2000/svg";
var cardScale = 0.35
var cardSpacing = 100;
const placeHolderIMG = '../imgs/placeholder.png';
const cardFolder = '../imgs/cards/';
function generateGame() {
    button.remove();
    //ADD FUNCTION TO CLEAR THE BOARD
    //Add timer
    createSection('freeCell', 4, 0, 0);
    createSection('foundCell', 4, cardSpacing * 4.5, 0);
    createSection('tableauArea', 8, 25, 145);
    testAddCard();
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

function testAddCard() {
    var holder = document.getElementById('tableauAreapos1')
    var intendedCard = cardFolder + "BLACKCLUBSACE.png"
    var holdG = document.createElementNS(svgNS, 'g');
    var img = document.createElementNS(svgNS, 'image');
    var mouseX = 0;
    var mouseY = 0
    var lastY = 0;
    var lastX = 0;
    img.setAttribute('href', intendedCard);
    holdG.appendChild(img);
    holder.appendChild(holdG);
    let isDragging = false;
    var scaleX = holder.getCTM().a;
    var scaleY = holder.getCTM().d;
    holdG.addEventListener('mousedown', (event) => {
        isDragging = true;
        lastY = holdG.parentNode.parentNode.getCTM().f
        lastX = holdG.parentNode.parentNode.getCTM().e
        holdG.parentNode.removeChild(holdG);
        scale(holdG, 0.35, 0.35)
        holder.parentNode.parentNode.appendChild(holdG)

        moveToMouse(event, scaleX, scaleY, img)
        mouseX = event.clientX
        mouseY = event.clientY

    });
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
    });
}

function scale(element, X, Y) {
    element.setAttribute('transform', `scale(${X},${Y})`)
}
function unScale(element) {
    element.setAttribute('transform', `scale(1,1)`)
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

