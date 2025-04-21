//const { CardNumber } = require("./dist/CardNumber");
//import sharp from 'sharp';

import * as A from "../../dist/CardNumber.js";
const CardNumber = exports.CardNumber
const width = 216;
const height = 311;
//import { CardNumber } from "./src/model/CardNumber.ts";
const clubPath = "M641 1670 c-93 -34 -167 -103 -218 -201 -26 -49 -28 -63 -28 -164 0 -98 3 -116 26 -161 l25 -52 -86 -4 c-69 -3 -98 -10 -144 -32 -73 -36 -146 -109 -183 -183 -26 -53 -28 -67 -28 -168 0 -101 2 -114 29 -167 70 -138 199 -218 351 -218 126 0 223 47 308 148 34 42 34 33 -3 -72 -42 -117 -87 -216 -143 -308 -26 -42 -47 -78 -47 -80 0 -2 124 -3 275 -3 151 0 275 1 275 2 0 1 -20 33 -44 70 -70 109 -149 280 -170 367 -7 27 -4 25 39 -22 59 -66 164 -120 251 -128 159 -17 315 70 386 214 31 62 33 73 33 172 0 99 -2 110 -33 172 -67 136 -187 211 -339 212 -46 1 -83 1 -83 2 0 0 15 30 33 65 30 61 32 70 32 174 0 101 -2 115 -28 168 -37 74 -107 144 -183 181 -79 40 -219 47 -303 16z"
const spadePath = "M746 1662 c-57 -79 -284 -338 -426 -486 -222 -230 -293 -345 -307 -491 -27 -289 327 -465 644 -320 31 14 59 25 63 25 14 0 -9 -88 -36 -142 -15 -29 -54 -95 -86 -146 -33 -52 -58 -96 -55 -98 2 -2 118 -3 256 -2 l253 3 -67 100 c-79 118 -121 197 -130 248 -4 20 -5 37 -2 37 2 0 34 -11 71 -25 193 -73 380 -47 506 71 27 25 62 72 77 103 25 49 28 67 27 146 -1 162 -61 267 -288 505 -81 85 -214 233 -294 327 -101 119 -153 173 -167 173 -11 0 -29 -13 -39 -28z";
const heartPath = "M327 1670 c-199 -50 -329 -245 -314 -468 15 -212 117 -387 432 -742 176 -198 257 -303 298 -387 17 -35 34 -63 37 -63 3 0 22 33 42 73 50 96 106 168 288 372 319 358 422 533 437 747 20 294 -216 526 -474 465 -114 -26 -222 -112 -271 -214 -9 -18 -18 -33 -21 -33 -3 0 -17 21 -31 48 -78 148 -271 240 -423 202z"
const diamondPath = "M730 1602 c-123 -230 -399 -534 -637 -700 -45 -31 -82 -59 -82 -62 0 -3 37 -31 82 -62 238 -166 514 -470 637 -700 23 -43 43 -78 45 -78 2 0 22 35 45 78 135 253 432 569 706 750 19 12 19 12 0 25 -274 180 -571 496 -706 749 -23 43 -43 78 -45 78 -2 0 -22 -35 -45 -78z"

const paths = { "HEARTS": heartPath, "CLUBS": clubPath, "SPADES": spadePath, "DIAMONDS": diamondPath };
const numberList = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]


function generateCard(color, suit, number) {
    var svgNS = "http://www.w3.org/2000/svg";
    var svgElement = document.createElementNS(svgNS, "svg");
    svgElement.setAttribute("width", width);
    svgElement.setAttribute("height", height);
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    svgElement.setAttribute("viewBox", "0 0 216 311");
    document.body.appendChild(svgElement);
    var mainGElement = document.createElementNS(svgNS, 'g');
    mainGElement.setAttribute('transform', "translate(3, 3) ")
    svgElement.appendChild(mainGElement);

    var rectElement = document.createElementNS(svgNS, "rect");
    rectElement.setAttribute("width", 210);
    rectElement.setAttribute("height", 305);
    rectElement.setAttribute("fill", "white");
    rectElement.setAttribute("rx", 15);
    rectElement.setAttribute("stroke", "black");
    rectElement.setAttribute("stroke-width", 3);
    mainGElement.appendChild(rectElement)


    var textElement = document.createElementNS(svgNS, "text");
    textElement.setAttribute("x", 25);
    textElement.setAttribute("y", 35);
    textElement.setAttribute("font-size", "50");
    textElement.setAttribute("fill", color);
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("dominant-baseline", "central");
    textElement.innerHTML = numberList[CardNumber[number]];
    mainGElement.appendChild(textElement);

    textElement = document.createElementNS(svgNS, "text");
    textElement.setAttribute("x", 175);
    textElement.setAttribute("y", 265);
    textElement.setAttribute("font-size", "50");
    textElement.setAttribute("fill", color);
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("dominant-baseline", "central");
    textElement.setAttribute("transform", "rotate(180,180,265)");
    textElement.innerHTML = numberList[CardNumber[number]];
    mainGElement.appendChild(textElement);

    var tempGElement = document.createElementNS(svgNS, 'g');
    tempGElement.setAttribute("transform", "translate(63,190)scale(0.0550000,-0.0550000)");
    var pathElement = document.createElementNS(svgNS, 'path');
    pathElement.setAttribute('fill', color);
    pathElement.setAttribute('d', paths[suit]);
    tempGElement.appendChild(pathElement);
    mainGElement.appendChild(tempGElement);



    tempGElement = document.createElementNS(svgNS, 'g');
    tempGElement.setAttribute("transform", "translate(7,103)scale(0.0250000,-0.0250000)");
    pathElement = document.createElementNS(svgNS, 'path');
    pathElement.setAttribute('fill', color);
    pathElement.setAttribute('d', paths[suit]);
    tempGElement.appendChild(pathElement);
    mainGElement.appendChild(tempGElement);


    tempGElement = document.createElementNS(svgNS, 'g');
    tempGElement.setAttribute("transform", "translate(165,195)scale(0.0250000,0.0250000)");
    pathElement = document.createElementNS(svgNS, 'path');
    pathElement.setAttribute('fill', color);
    pathElement.setAttribute('d', paths[suit]);
    tempGElement.appendChild(pathElement);
    mainGElement.appendChild(tempGElement);
    const fileName = color+suit+number+".png"
    createImage(new XMLSerializer().serializeToString(svgElement),fileName);

}
async function createImage(sentSvg,fileName) {
    await fetch('http://localhost:3001/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ svg: sentSvg, name:fileName }),
    })
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error(error));
    return false;
}

generateCards();
function generateCards() {
    for (var suit in paths) {
        var color = 'RED';
        if (suit === 'CLUBS' || suit === 'SPADES') color = 'BLACK';
        for (var i = 0; i < 13; i++) {
            var number = CardNumber[i];
            generateCard(color,suit,number);

        }
    }

}