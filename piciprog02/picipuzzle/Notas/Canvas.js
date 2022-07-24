const puzzleContainer = document.querySelector('.puzzle-container');
let puzzle = [];
let puzzleSinUltPieza = [];
let size = 4;
let totalSize = 600;
generarPuzzle();
randomPuzzle();
renderPuzzle();
const width = 400;
const height = 600;
//let randomValues = []
let foto;
let piezas = [];
pici;
let cols = 4;
let rows = 4;
let w, h;
let board = [];
cargarImagen();
renderPuzzle();
setup();
function cargarImagen() {
  debugger;
  //  foto = loadImage('../../src/scripts/foto1.png');
  foto = document.loadImage('../../src/scripts/foto5.jpeg');
  //foto = loadImage('../../src/scripts/foto5.jpeg');
  debugger;
}
class Pieza {
  constructor(i, img) {
    this.index = i;
    this.img = img;
  }
}

function setup() {
  createCanvas(400, 400);
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImageBitmap(w, h);
      //  foto.loadPixels();
      //  img.loadPixels();
      img.copy(foto, x, y, w, h, 0, 0, w, h);
      //  img.updatePixels();
      let index = i + j * cols;
      board.push(index);
      let pieza = new Pieza(index, img);
      piezas.push(pieza);
    }
  }
}
//function renderPuzzle() {
//  image(foto, 0, 0);
//   for (let i = 0; i < piezas.length; i++) {
//     for (let j = 0; j < rows; j++) {
//       let index = i + j * cols;
//       let x = i * w;
//       let y = j * h;
//       let piezaIndex = board[index];
//       let img = piezas[piezaIndex].img;
//       Image(img, x, y);
//     }
//}

function getRow(pos) {
  return Math.ceil(pos / size);
}
function getCol(pos) {
  const col = pos % size;
  if (col === 0) {
    return size;
  }
  return col;
}
function generarPuzzle() {
  for (let i = 1; i <= size * size; i++) {
    puzzle.push({
      value: i,
      position: i,
      x: (getCol(i) - 1) * (totalSize / size),
      y: (getRow(i) - 1) * (totalSize / size),
      disabled: false,
    });
    puzzleSinUltPieza.push({
      value: i,
      position: i,
      x: (getCol(i) - 1) * (totalSize / size),
      y: (getRow(i) - 1) * (totalSize / size),
      disabled: false,
    });
  }
  //  console.log({ puzzleSinUltPieza });
  //  console.log({ puzzle });
  //  console.log({ puzzleSinUltPieza });
  puzzleSinUltPieza.pop();
}
function randomPuzzle() {
  const randomValues = getRandomValues();
  let i = 0;
  //  console.log({ randomValues });
  for (let puzzleItem of puzzleSinUltPieza) {
    puzzleItem.value = randomValues[i];
    i++;
  }
  //  console.log({ puzzleSinUltPieza });
  //  console.log({ puzzle });
  i = 0;
  for (let puzzleItem of puzzle) {
    if (puzzleItem.value === size * size) {
      puzzleItem.x = puzzleItem.x + totalSize / size;
    } else {
      puzzleItem.value = randomValues[i];
    }
    i++;
  }
}

function getRandomValues() {
  const values = [];
  for (let i = 1; i <= size * size - 1; i++) {
    values.push(i);
  }
  const randomValues = values.sort(() => Math.random() - 0.5);
  return randomValues;
}
function renderPuzzle() {
  puzzleContainer.innerHTML = '';
  for (let puzzleItem of puzzle) {
    if (puzzleItem.value <= puzzle.length) {
      puzzleContainer.innerHTML += `
      <div class="pieza" style="left: ${puzzleItem.x}px; top: ${
        puzzleItem.y
      }px;  height: ${totalSize / size}px;  width: ${totalSize / size}px;" >
        ${puzzleItem.value}
      </div>
    `;
    }
  }
}
