var draw

const grid = 4*4
const rowSize = 4
const sqSize = 30
const gap = 1
const base = sqSize+gap
const fill = '#111'
const blank = '#f0f0f0'
//const code = 1010
var squares = new Array(25)
var textbox = document.getElementById("codeBox")

generateCube()

textbox.addEventListener("keyup", function(event) {
  event.preventDefault()
  if (event.keyCode === 13) {
    document.getElementById("incButton").click()
  }
})

//document.getElementById("codeBox").removeAttribute('readonly')

function generateCube() {
  draw = SVG('drawing').size(300, 300)

  // set up row
  draw.rect(sqSize, sqSize).move(0,0).attr({ fill: fill })
  draw.rect(sqSize, sqSize).move(sqSize+gap,0).attr({ fill: fill })
  draw.rect(sqSize, sqSize).move((sqSize+gap)*2,0).attr({ fill: blank })
  draw.rect(sqSize, sqSize).move((sqSize+gap)*3,0).attr({ fill: blank })
  draw.rect(sqSize, sqSize).move((sqSize+gap)*4,0).attr({ fill: blank })

  // set up column
  draw.rect(sqSize, sqSize).move(0,sqSize+gap).attr({ fill: fill })
  draw.rect(sqSize, sqSize).move(0,(sqSize+gap)*2).attr({ fill: blank })
  draw.rect(sqSize, sqSize).move(0,(sqSize+gap)*3).attr({ fill: blank })
  draw.rect(sqSize, sqSize).move(0,(sqSize+gap)*4).attr({ fill: blank })

  // init grid
  for (var i = 0; i < grid; i++) {
    const x = base + (sqSize+gap) * (i % rowSize)
    const y = base + (sqSize+gap) * Math.floor(i / rowSize)
    //console.log(`${i} ${x} ${y} ${Math.floor(i / rowSize)} ${i % rowSize} | ${Math.pow(2, i)} ${Math.pow(2, i) == (Math.pow(2, i) & code)}`)
    //const fillColour = (Math.pow(2, i) == (Math.pow(2, i) & code)) ? fill : blank
    squares[i] = draw.rect(sqSize, sqSize).move(x,y).attr({ fill: blank })
  }
}

function displayCode() {
  //var textbox = document.getElementById('codeBox')
  var code = parseInt(textbox.value)
  //console.log(code)
  //check code > verify against squares
  for (var i = 0; i < grid; i++) {
    const fillColour = (Math.pow(2, i) == (Math.pow(2, i) & code)) ? fill : blank
    squares[i].attr({ fill: fillColour })
  }
  code++
  textbox.value = code
}

function displayCode2(code) {
  //var textbox = document.getElementById('codeBox')
  //var code = parseInt(textbox.value)
  //console.log(code)
  //check code > verify against squares
  for (var i = 0; i < grid; i++) {
    const fillColour = (Math.pow(2, i) == (Math.pow(2, i) & code)) ? fill : blank
    squares[i].attr({ fill: fillColour })
  }
}

var countLoop=0;

var i = 1;                     //  set your counter to 1
function reset() {
  i=1
}

function tryMany () {
   setTimeout(function () {
     var code = parseInt(textbox.value)
      displayCode2(code++)
      textbox.value = code
      i++;
      if (i < 50) {
         tryMany();
      }
   }, 200)
}
