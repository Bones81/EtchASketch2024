const container = document.querySelector('#container')

function getGridSize() {
    let size
    while(!size || size < 1 || size > 100) {
        size = +prompt('What size grid would you like? (Must enter an integer between 1 and 100)', 0)
    }
    return size
}
const choice = getGridSize()

let choiceSquared = choice * choice

// DETERMINE Size of boxes in #container
// Size of grid in px wide / choice = size of box in px wide
let widthOfUnit = container.getBoundingClientRect().width / choice
console.log('widthOfUnit: ' + widthOfUnit);
// console.log(widthOfUnit);
// number of boxes should equal choiceSquared
let numOfBoxes = choiceSquared
console.log('numOfBoxes: ' + numOfBoxes);
// Generate number of boxes of appropriate box size inside #container
for(let i = 0; i < numOfBoxes; i++) {
    const unitBox = document.createElement('div')
    unitBox.classList.add('unit-box')
    unitBox.style.flex = `1 0 ${widthOfUnit}px`
    unitBox.style.height = widthOfUnit

    function changeColor(e, elem) {
        console.log(e.target);
        elem.style.backgroundColor = `rgb(${generateRandomRGBColor()})`
        console.log('event fired');
    }
    unitBox.addEventListener('mouseover', (e) => changeColor(e, unitBox))
    container.appendChild(unitBox)
}

function generateRandomRGBNumber() {
    return Math.floor(Math.random() * 256)
}

function generateRandomRGBColor() {
    return `${generateRandomRGBNumber()},${generateRandomRGBNumber()},${generateRandomRGBNumber()}`
}