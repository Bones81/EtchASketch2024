const log = (x) => console.log(x);

const container = document.querySelector('#container')
const defaultColor = 'rgb(255, 255, 255)'

function chooseGridSize() {
    let size
    while(!size || size < 1 || size > 100) {
        size = +prompt('What size grid would you like? (Must enter an integer between 1 and 100)', 0)
    }
    return size
}

function returnGridSize() {
    let boxes = container.querySelectorAll('div')
    log('number of boxes:' + boxes.length)
    return boxes.length
}

function generateRandomRGBNumber() {
    return Math.floor(Math.random() * 256)
}

function generateRandomRGBColor() {
    return `${generateRandomRGBNumber()},${generateRandomRGBNumber()},${generateRandomRGBNumber()}`
}

function changeToRandomColor(e, elem) {
    elem.style.backgroundColor = `rgb(${generateRandomRGBColor()})`;
    elem.style.opacity = '1.0'
}

function changeToBlack(e, elem) {
    elem.style.backgroundColor = 'rgb(0, 0, 0)'
    elem.style.opacity = '1.0'
}

function erase(e, elem) {
    elem.style.backgroundColor = defaultColor
}

function greyscale(e, elem) {
    // Grab and reset opacity of elem
    let startingColor = window.getComputedStyle(elem).backgroundColor;
    if (startingColor !== 'rgb(0, 0, 0)') {
        elem.style.backgroundColor = 'rgb(0, 0, 0)'
        elem.style.opacity = '0.1'
    } else {
        let oldOpacity = +window.getComputedStyle(elem).opacity;
        let newOpacity = oldOpacity + 0.1
        if (newOpacity > 1) {
            newOpacity = 1
        } 
        elem.style.opacity = `${newOpacity}`
    }
}

function reset() {
    container.replaceChildren('')
    drawGrid()
}

const resetBtn = document.querySelector('#reset-btn')
resetBtn.addEventListener('click', reset)

let colorMode = changeToBlack
function setColorMode(e) {
    log(e.target.id)
    let target = e.target.id
    switch(target) {
        case 'black-btn':
            colorMode = changeToBlack
            break;
        case 'random-btn':
            colorMode = changeToRandomColor
            break;
        case 'greyscale-btn':
            colorMode = greyscale
            break;
        case 'eraser-btn':
            colorMode = erase
            break;
        default:
            log('An error has occurred.')
    }
    return colorMode
}

const colorModeBtns = document.querySelectorAll('.color-mode-btn')
colorModeBtns.forEach( (btn) => btn.addEventListener('click', setColorMode))

function drawGrid() {
    const choice = chooseGridSize();
    let choiceSquared = choice * choice;
    // DETERMINE Size of boxes in #container
    // Size of grid in px wide / choice = size of box in px wide
    let widthOfUnit = container.getBoundingClientRect().width / choice;
    console.log("widthOfUnit: " + widthOfUnit);
    // console.log(widthOfUnit);
    // number of boxes should equal choiceSquared
    let numOfBoxes = choiceSquared;
    console.log("numOfBoxes: " + numOfBoxes);
    // Generate number of boxes of appropriate box size inside #container
    for (let i = 0; i < numOfBoxes; i++) {
      const unitBox = document.createElement("div");
      unitBox.classList.add("unit-box");
      unitBox.style.flex = `1 0 ${widthOfUnit}px`;
      unitBox.style.height = widthOfUnit;


      unitBox.addEventListener("mouseover", (e) => colorMode(e, unitBox));
      container.appendChild(unitBox);
    }
}

drawGrid()