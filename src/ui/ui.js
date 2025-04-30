var cardScale = 0.4
var svgElement = document.getElementById('gameSVG');
const placeHolderIMG = '../imgs/placeholder.png';
var svgNS = "http://www.w3.org/2000/svg";
var cardSpacing = 100;
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