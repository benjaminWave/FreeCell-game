import { newGame, undo,enableAutoAssign,reportBug } from './script.js';
var cardScale = 0.4
var svgElement = document.getElementById('gameSVG');
const placeHolderIMG = '../src/imgs/placeholder.png';
var svgNS = "http://www.w3.org/2000/svg";
var cardSpacing = 100;
var svgDef = document.getElementById('svg-defs');
svgElement.removeChild(svgDef);

export function createSection(tag, size, offsetX, offsetY, stackable) {
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

export function createMover() {
    var mainG = document.createElementNS(svgNS, 'g')
    mainG.setAttribute('id', 'mover');
    mainG.setAttribute('stackable', 1);
    svgElement.appendChild(mainG);
}

export function createWoodPanel() {
    svgElement.appendChild(svgDef);
    var mainG = document.createElementNS(svgNS, 'g');
    mainG.setAttribute('id', 'panel');
    let offsetX = 1043;
    mainG.setAttribute('transform', `translate (${offsetX},${0})`);
    var rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('class', 'panel');
    mainG.appendChild(rect);
    svgElement.appendChild(mainG);
}

export function createButtons() {
    const mainDiv = document.getElementById('otherButtons');

    const buttonUndo = document.createElement('button');
    buttonUndo.setAttribute('id', "undoButton");
    buttonUndo.setAttribute('class', "startButton");
    buttonUndo.setAttribute('style', "position: absolute;right:0;");
    buttonUndo.innerHTML = 'Undo'
    buttonUndo.addEventListener("click", undo);

    const buttonNew = document.createElement('button');
    buttonNew.setAttribute('id', "newButton");
    buttonNew.setAttribute('class', "startButton");
    buttonNew.setAttribute('style', "position: absolute; right:0; top: 80px;");
    buttonNew.innerHTML = 'New Game'
    buttonNew.addEventListener("click", newGame);
    mainDiv.append(buttonNew);
    mainDiv.append(buttonUndo);

   /* const buttonReport = document.createElement('button');
    buttonReport.setAttribute('id', "reportButton");
    buttonReport.setAttribute('class', "startButton");
    buttonReport.setAttribute('style', "position: absolute; right:0; top: 160px;");
    buttonReport.innerHTML = 'Report Bug'
    buttonReport.addEventListener("click", reportBug);
    mainDiv.append(buttonReport);*/
}

 export function addMisc() {
    const mainDiv = document.getElementById('otherFeatures');
    const timeText = document.createElement('p');
    timeText.setAttribute('id', "timer");
    timeText.setAttribute('class', "startText");
    timeText.innerHTML = `Time: 00:00`;
    timeText.setAttribute('style', "position: absolute; top: 0px; ");
    mainDiv.append(timeText);

    const moveText = document.createElement('p');
    moveText.setAttribute('id', "moveCounter");
    moveText.innerHTML = `Moves: 0`;
    moveText.setAttribute('class', "startText");
    moveText.setAttribute('style', "position: absolute ; top: 80px;");
    mainDiv.append(moveText);


    /*const textAssign = document.createElement('p');
    textAssign.setAttribute('style', "position: absolute; right:0; top: 267px;font-size:13px;");
    textAssign.innerHTML = 'Toggle Auto Assign'
    const buttonAssign = document.createElement('button');
    buttonAssign.setAttribute('id', "assignButton");
    buttonAssign.setAttribute('class', "startButton");
    buttonAssign.setAttribute('style', "position: absolute; right:0; top: 240px;");
    buttonAssign.innerHTML = 'Disable'
    buttonAssign.addEventListener("click", enableAutoAssign);
    mainDiv.append(textAssign);
    mainDiv.append(buttonAssign);*/
}


export function loadGameOverScreen() {
    var mainG = document.createElementNS(svgNS, 'g');
    mainG.setAttribute('id', 'msg');
    let offsetX = 300;
    mainG.setAttribute('transform', `translate (${offsetX},${0})`);
    var rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('class', 'msgPanel');
    var textElement = document.createElementNS(svgNS, "text");
    textElement.setAttribute("x", 200);
    textElement.setAttribute("y", 25);
    textElement.setAttribute("font-size", "37");
    textElement.setAttribute("fill", 'white');
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("dominant-baseline", "central");
    for (var i = 0; i < 2; i++) {
        let tspan = document.createElementNS(svgNS, "tspan");
        tspan.innerHTML = (i == 0) ? "Game Over!" : "Start a new game";
        tspan.setAttribute('x', 200);
        tspan.setAttribute('dy', '1.2em');
        textElement.appendChild(tspan);
    }

    mainG.appendChild(rect);
    mainG.appendChild(textElement);
    svgElement.appendChild(mainG);
}