import logo from './pages/logo-pici130x177t.png';
import './styles/App.css';
import React, { useState } from 'react';
import img1 from './assets/logo-pici300x400.jpeg';

let cols = 4;
let rows = 6;
let piezas = [];
let w, h;
let board = [];
let width = 200;
let height = 300;
let wPieza = width / cols;
//wPieza = wPieza - (cols - 1);
let hPieza = height / rows;
//hPieza = hPieza - (rows - 1);
//let img = null;
let img = document.getElementById('img1');
//img.src = '../images/logo-pici.jpeg';
let imgPuzzle = document.getElementById('imgPuzzle');

// CanvasDraw = {
//   onChange: null,
//   loadTimeOffset: 5,
//   lazyRadius: 30,
//   brushRadius: 1,
//   brushColor: '#444',
//   catenaryColor: '#0a0302',
//   gridColor: 'rgba(150,150,150,0.17)',
//   hideGrid: false,
//   canvasWidth: width,
//   canvasHeight: height,
//   disabled: false,
//   imgSrc: '',
//   saveData: null,
//   immediateLoading: false,
//   hideInterface: false,
//   gridSizeX: width / cols,
//   gridSizeY: height / rows,
//   gridLineWidth: 0.5,
//   hideGridX: false,
//   hideGridY: false,
//   enablePanAndZoom: false,
//   mouseZoomFactor: 0.01,
//   zoomExtents: { min: 0.33, max: 3 },
// };

// CanvasDraw.brushRadius = 1;
// CanvasDraw.canvasWidth = width;
// CanvasDraw.canvasHeight = height;
// CanvasDraw.gridSizeX = width / cols;
// CanvasDraw.gridSizeY = height / rows;

function App() {
  //img.src = '../images/logo-pici.jpeg';
  const [imageURL, setImageUrl] = useState(img1);
  //debugger;
  //mostrarImagenElegida();
  //const [imageURL, setImageUrl] = useState('');

  function mostrarImagenElegida(event) {
    //if (event){
    let file = event.target.files[0];
    console.log(event.target.files[0]);
    //let file = '../images/logo-pici.jpeg';
    let reader = new FileReader('');
    reader.onload = function (event) {
      setImageUrl(event.target.result);
      console.log(event.target.result);
    };
    reader.readAsDataURL(file);
  }
  function setup() {
    w = width / cols;
    h = height / rows;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * w;
        let y = j * h;
        let img = createImageBitmap(w, h);
        //  foto.loadPixels();
        //  img.loadPixels();
        img.copy(imgPuzzle, x, y, w, h, 0, 0, w, h);
        //  img.updatePixels();
        let index = i + j * cols;
        board.push(index);
        let pieza = new Pieza(index, img);
        piezas.push(pieza);
      }
    }
  }
  class Pieza {
    constructor(i, img) {
      this.index = i;
      this.img = img;
    }
  }
  //console.log({(width / cols - (cols - 1))});
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Pici Puzzle</h1>
      </header>
      <main>
        <h2>Configura tu imagen del Pici-Puzzle</h2>
        <div className="elegir-fuente-imagen">
          <label for="basicas"> Imagenes incluidas </label>
          <input type="radio" name="tipo-de-fuente-img" id="basicas" />
          <label for="api"> De una API: </label>
          <input type="radio" name="tipo-de-fuente-img" id="api" />
          <label for="mis-archivos"> De tus Galeria </label>
          <input type="radio" name="tipo-de-fuente-img" id="mis-archivos" />

          <div className="cuadro-carga-imagen">
            <div className="img-incluida">
              <label for="img-incluida">
                Elige la imagen con la que quieres jugar:{' '}
              </label>
              <select name="img-incluida" id="img-incluida">
                <option>Imagen 1</option>
                <option>Imagen 2</option>
                <option>Imagen 3</option>
                <option>Imagen 4</option>
                <option>Imagen 5</option>
                <option>Imagen 6</option>
                <option>Imagen 7</option>
                <option>Imagen 8</option>
                <option>Imagen 9</option>
              </select>
            </div>
            <div className="img-api">
              <label for="api">Url de la API</label>
              <input type="url" id="api" />
            </div>
            <div className="img-galeria">
              <input
                id="inputFile1"
                onChange={mostrarImagenElegida}
                type="file"
                accept=".jpg,.png,.bmp"
              />
            </div>
          </div>
          <div className="div-vertical-apaisada">
            <div className="div-vertical">
              <label for="vertical-apaisada"> Vertical </label>
              <input type="radio" name="vertical-apaisada" id="vertical" />
            </div>
            <div className="div-apaisada">
              <label for="vertical-apaisada"> Apaisada </label>
              <input type="radio" name="vertical-apaisada" id="apaisada" />
            </div>
          </div>
        </div>
        <div className="foto">
          <img className="img-foto" id="img1" src={imageURL} alt="imagen" />
        </div>
        <div className="elige-nivel">
          <form>
            <label for="nivel">Elige el nivel al que quieres jugar: </label>
            <select name="nivel" id="nivel">
              <option>Nivel 1</option>
              <option>Nivel 2</option>
              <option>Nivel 3</option>
            </select>
          </form>
        </div>
      </main>
    </div>
  );
}
//debugger;
export default App;

//      <CanvasDraw
//        imgSrc={imageURL}
//        brushRadius={null}
//        gridColor={`#088a27`}
//        canvasWidth={width}
//        canvasHeight={height}
//        className="puzzle-container"
//      ></CanvasDraw>
//      <img id="imgPuzzle" src="" alt="" />
