var draw = SVG('drawing').size(300, 300)

const grid = 5*5
const rowSize = 5
const sqSize = 10
const gap = 1
const fill = '#ccc'
const blank = '#f0f0f0'
const code = 1010

var squares = new Array(25)

// init code
for (var i = 0; i < grid; i++) {
  const x = (sqSize+gap) * (i % rowSize)
  const y = (sqSize+gap) * Math.floor(i / rowSize)
  //console.log(`${i} ${x} ${y} ${Math.floor(i / rowSize)} ${i % rowSize} | ${Math.pow(2, i)} ${Math.pow(2, i) == (Math.pow(2, i) & code)}`)
  //const fillColour = (Math.pow(2, i) == (Math.pow(2, i) & code)) ? fill : blank
  squares[i] = draw.rect(sqSize, sqSize).move(x,y).attr({ fill: blank })
}

//check code > verify against squares
for (var i = 0; i < grid; i++) {
  const fillColour = (Math.pow(2, i) == (Math.pow(2, i) & code)) ? fill : blank
  squares[i].attr({ fill: fillColour })
}
