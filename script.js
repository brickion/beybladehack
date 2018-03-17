var draw
const grid = 5*5
const rowSize = 5
const sqSize = 20
const gap = 0
const base = sqSize+gap
const fill = '#111'
const blank = '#fff'
const timeInterval = 100
var flashLoopCount = 1

var squares = new Array(grid)
var textbox = document.getElementById("codeBox")

generateCube()

// use button to trigger
textbox.addEventListener("keyup", function(event) {
  event.preventDefault()
  if (event.keyCode === 13) {
    document.getElementById("incButton").click()
  }
})

function generateCube() {
  draw = SVG('drawing').size(sqSize*(rowSize+2), sqSize*(rowSize+2))

  draw.rect(sqSize*(rowSize+2), sqSize*(rowSize+2)).move(0,0).attr({ fill: fill })

  // init grid
  for (var i = 0; i < grid; i++) {
    const x = base + (sqSize+gap) * (i % rowSize)
    const y = base + (sqSize+gap) * Math.floor(i / rowSize)
    //console.log(`${i} ${x} ${y} ${Math.floor(i / rowSize)} ${i % rowSize} | ${Math.pow(2, i)} ${Math.pow(2, i) == (Math.pow(2, i) & code)}`)
    //const fillColour = (Math.pow(2, i) == (Math.pow(2, i) & code)) ? fill : blank
    squares[i] = draw.rect(sqSize, sqSize).move(x,y).attr({ fill: blank })
  }
}

function fetchAndDisplayCode() {
  var code = parseInt(textbox.value)
  displayCode(code)
  code++
  textbox.value = code
}

function displayCode(code) {
  //check code > verify against squares
  for (var i = 0; i < grid; i++) {
    const fillColour = (Math.pow(2, i) == (Math.pow(2, i) & code)) ? fill : blank
    squares[i].attr({ fill: fillColour })
  }
}

function reset() {
  flashLoopCount=1
}

function tryMany (count) {
   setTimeout(function () {
     var code = parseInt(textbox.value)
      displayCode(code++)
      textbox.value = code
      if (flashLoopCount++ < 100) {
         tryMany();
      }
   }, timeInterval)
}
