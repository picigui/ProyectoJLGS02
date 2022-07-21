import React, { useReducer } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Helmet } from 'react-helmet';
//import { Link } from 'react-router-dom';
import '../styles/juego.css';
import { Header } from '../components/Header';
import fotoElegida from './imagen06.jpg';

let rows = 3;
let cols = 3;
let width = 300;
let height = 400;

let actualPieza;
let piezaVacia;
let piezaFuera;
let ultimaPieza;
let siCompleto = false;

let arrayCanvas = [
  { nombCanvas: 'canvas00', posW: 0, posH: 0 },
  { nombCanvas: 'canvas01', posW: 0, posH: -100 },
  { nombCanvas: 'canvas02', posW: 0, posH: -200 },
  { nombCanvas: 'canvas03', posW: -100, posH: 0 },
  { nombCanvas: 'canvas04', posW: -100, posH: -100 },
  { nombCanvas: 'canvas05', posW: -100, posH: -200 },
  { nombCanvas: 'canvas06', posW: -200, posH: 0 },
  { nombCanvas: 'canvas07', posW: -200, posH: -100 },
  { nombCanvas: 'canvas08', posW: -200, posH: -200 },
];
let arrayPiezas = [
  { id: 'img0-0', src: './logo-pici130x177t.png', nImg: 1, nOrdImg: 0 },
  { id: 'img0-1', src: './logo-pici130x177t.png', nImg: 2, nOrdImg: 1 },
  { id: 'img0-2', src: './logo-pici130x177t.png', nImg: 3, nOrdImg: 2 },
  { id: 'img1-0', src: './logo-pici130x177t.png', nImg: 4, nOrdImg: 3 },
  { id: 'img1-1', src: './logo-pici130x177t.png', nImg: 5, nOrdImg: 4 },
  { id: 'img1-2', src: './logo-pici130x177t.png', nImg: 6, nOrdImg: 5 },
  { id: 'img2-0', src: './logo-pici130x177t.png', nImg: 7, nOrdImg: 6 },
  { id: 'img2-1', src: './logo-pici130x177t.png', nImg: 8, nOrdImg: 7 },
  { id: 'img2-2', src: './logo-pici130x177t.png', nImg: 9, nOrdImg: 8 },
];

// valores que debo recibir de la pagina home
let imageURL = fotoElegida;
imageURL = document.createElement('img');
fotoElegida = imageURL.src;
let apaisada = false;
let nivelSeleccionado = 'n1';

let imgOrderResultadoCorrecto = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let imgOrder = [4, 2, 8, 5, 1, 6, 7, 0, 3];

debugger;
function crearPiezasCanvas() {
  //debugger;
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Creando las piezas canvas
      let piezaCanvas = document.createElement('canvas');
      piezaCanvas.id = arrayCanvas[i].nombCanvas;
      piezaCanvas.width = width / cols;
      piezaCanvas.height = height / rows;
      //      piezaCanvas = document.getElementById(piezaCanvas.id);
      let ctx = piezaCanvas.getContext('2d');
      ctx.drawImage(imageURL, arrayCanvas[i].posW, arrayCanvas[i].posH);
      // Creando las piezas imagenes
      const dataURL = piezaCanvas.toDataURL();
      arrayPiezas[i] = document.createElement('img');

      arrayPiezas[i].id = 'img' + r.toString() + '-' + c.toString(); // 'img0-0'...'img2-2'
      arrayPiezas[i].src = dataURL;
      arrayPiezas[i].nImg = i + 1;
      arrayPiezas[i].nOrdImg = i;

      // se inicia la variable con la colocacion correcta
      imgOrderResultadoCorrecto[i] = i + 1;
      //debugger;
      if (r === rows - 1 && c === cols - 1) {
        piezaFuera = { ...arrayPiezas[i] };
        piezaFuera = document.createElement('img');
        ultimaPieza = { ...arrayPiezas[i] };
        piezaFuera.src = './0.jpg';
        piezaFuera.id = 'vacia';
        piezaFuera.addEventListener('dragstart', dragStart);
        // mover una imagen mientras esta clikeada.
        piezaFuera.addEventListener('dragover', dragOver);
        // dejar una imagen en otro lugar
        piezaFuera.addEventListener('dragenter', dragEnter);
        // arrastrar la imagen a otra imagen
        piezaFuera.addEventListener('dragleave', dragLeave);
        // arrastrar la imagen a otra imagen, suelta la imagen
        piezaFuera.addEventListener('drop', dragDrop);
        // despues de arrastrar y soltar, intercambie los dos piezas
        piezaFuera.addEventListener('dragend', dragEnd);

        //debugger;
      }
      // Creando los eventos del moviemiento de piezas
      // hacer click en una imagen para mover
      arrayPiezas[i].addEventListener('dragstart', dragStart);
      // mover una imagen mientras esta clikeada.
      arrayPiezas[i].addEventListener('dragover', dragOver);
      // dejar una imagen en otro lugar
      arrayPiezas[i].addEventListener('dragenter', dragEnter);
      // arrastrar la imagen a otra imagen
      arrayPiezas[i].addEventListener('dragleave', dragLeave);
      // arrastrar la imagen a otra imagen, suelta la imagen
      arrayPiezas[i].addEventListener('drop', dragDrop);
      // despues de arrastrar y soltar, intercambie los dos piezas
      arrayPiezas[i].addEventListener('dragend', dragEnd);
      //debugger;
      i++;
    }
  }
}

//function agregarEventosImg(img) {
//  //debugger;
//  img = document.createElement('img');
//  img = document.getElementById(img.id);
//  // Creando los eventos del moviemiento de piezas
//  // hacer click en una imagen para mover
//  img.addEventListener('dragstart', dragStart);
//  // mover una imagen mientras esta clikeada.
//  img.addEventListener('dragover', dragOver);
//  // dejar una imagen en otro lugar
//  img.addEventListener('dragenter', dragEnter);
//  // arrastrar la imagen a otra imagen
//  img.addEventListener('dragleave', dragLeave);
//  // arrastrar la imagen a otra imagen, suelta la imagen
//  img.addEventListener('drop', dragDrop);
//  // despues de arrastrar y soltar, intercambie los dos piezas
//  img.addEventListener('dragend', dragEnd);
//  return <img src={img.src} id={img.id} key={img.src} alt={img.id} />;
//}

// Valores iniciales para los reduce de esta pagina
//function init() {
//  return {
//    //    ordenPiezas: arrayPiezas,
//  };
//}
// console.log({ img1 });
//function juegoReducer(state, action) {
//  //debugger;
//  switch (action.type) {
//    // ********** Cambio de la imagen elegida ***********
//    case 'imgIncluidas':
//      return { ...state, sourceImagen: 'imgIncluidas' };
//    case 'imgAPI':
//      return { ...state, sourceImagen: 'imgAPI' };
//    case 'imgGaleria':
//      return { ...state, sourceImagen: 'imgGaleria' };
//
//    // ************** si el dispatch no tiene case *****************
//    default:
//      throw new Error();
//  }
//}

//function Juego({ initialStateJuego }) {
//  //debugger;
//  const [state, dispatch] = useReducer(juegoReducer, initialStateJuego, init);
function Juego() {
  crearPiezasCanvas();
  //const [state, dispatch] = useReducer(juegoReducer, init);
  //  let i = 0;
  //  for (let r = 0; r < rows; r++) {
  //    for (let c = 0; c < cols; c++) {
  //      // Creando las piezas
  //      debugger;
  //      let divPieza = document.createElement('div');
  //      let pieza = document.createElement('img');
  //      pieza.id = 'img' + r.toString() + '-' + c.toString(); // '0-0'...'2-2'
  //      //      pieza.src = '../images/' + imgOrder[i] + '.jpg';
  //      pieza.src = '../images/logo-pici.jpeg';
  //      pieza.nImg = imgOrder[i];
  //      pieza.nOrdImg = i;
  //      //debugger;
  //      if (imgOrder[i] === '0') {
  //        pieza.src = '../images/' + imgOrder[i] + '.jpg';
  //        piezaVacia = { ...pieza };
  //      }
  //      i++;
  //      // Creando los eventos del moviemiento de piezas
  //      // hacer click en una imagen para mover
  //      pieza.addEventListener('dragstart', dragStart);
  //      // mover una imagen mientras esta clikeada.
  //      pieza.addEventListener('dragover', dragOver);
  //      // dejar una imagen en otro lugar
  //      pieza.addEventListener('dragenter', dragEnter);
  //      // arrastrar la imagen a otra imagen
  //      pieza.addEventListener('dragleave', dragLeave);
  //      // arrastrar la imagen a otra imagen, suelta la imagen
  //      pieza.addEventListener('drop', dragDrop);
  //      // despues de arrastrar y soltar, intercambie los dos piezas
  //      pieza.addEventListener('dragend', dragEnd);
  //      debugger;
  //      divPieza.appendChild(pieza);
  //
  //      document.getElementById('tablero').append(divPieza);
  //      //      setTimeout(document.getElementById('tablero').append(divPieza), 2000);
  //      if (r === rows - 1 && c === cols - 1) {
  //        piezaFuera = document.querySelector('.img-pieza-fuera');
  //        piezaFuera = { ...pieza };
  //        //piezaVacia = { ...pieza };
  //        piezaFuera.src = '../images/0.jpg';
  //        piezaFuera.id = 'vacia';
  //        // piezaVacia.src = piezaFuera.src;
  //        // piezaVacia.id = 'vacia';
  //        // ultimaPieza.src = '../images/9.jpg';
  //        // piezaFuera = pieza;
  //        piezaFuera.src = '../images/9.jpg';
  //        piezaFuera.id = '2-2';
  //        document.getElementById('img-pieza-fuera').src = piezaFuera.src;
  //        // debugger;
  //      }
  //      debugger;

  debugger;
  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          sizes="24x33"
          href="../assets/logo-pici24x33.png"
        />
        <title>Pici - Puzzle - `(Juego)` 🤓</title>
      </Helmet>
      <Header />
      <main>
        <div className="juego">
          {/*************** presentacion de la imagen elegida *******************/}

          <div className="marco-foto">
            <div className="foto apaisadaNo" id="foto-elegida">
              <img
                className="img-foto"
                src={fotoElegida}
                alt="imagen elegida"
              ></img>
            </div>
          </div>

          {/*************** Mensaje para presentar al final del juego *************/}
          <h2 className="mensaje-gano">!!! Puzzle Completado ¡¡¡</h2>

          {/*************** Relleno del tablero de juego en canvas **************/}
          {/*************** presentacion del tablero de juego ********************/}
          <div className="grid-tablero" id="tablero">
            {arrayPiezas.map((img, index) => {
              return (
                <img
                  src={img.src}
                  id={img.id}
                  key={img.src + img.id}
                  alt={img.id}
                ></img>
              );
            })}
          </div>
          {/* agregarEventosImg(img, index);*/}

          {/***** Grid que contiene el avance del juego y la ultima pieza *******/}
          <div className="grid-ultima-pieza">
            <div className="h3-mov-time">
              <h3 className="h3-movimientos">
                Movimientos: <span id="movimientos">0</span>
              </h3>
              <h3 className="h3-tiempo">
                Tiempo: <span id="tiempo">0</span>
              </h3>
              <div className="empezar">
                <button className="btn-empezar" type="button">
                  Empezar
                </button>
              </div>
            </div>
            <img
              className="img-pieza-fuera"
              src={piezaFuera.src}
              id={piezaFuera.id}
              alt="img-pieza-fuera"
            />
          </div>
        </div>
      </main>
    </>
  );
}

function dragStart() {
  //  debugger;
  actualPieza = this;
}

function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave(e) {
  e.preventDefault();
}
function dragDrop() {
  console.log(this.nImg);
  if (this.nImg === '0') {
    piezaVacia = this;
  } // esto se refiere a la pieza que se coloca encima
}

function dragEnd() {
  //  debugger;

  if (piezaFuera.id === 'vacia') {
    return;
  }
  // Tomo nota de las coodenadas de la pieza pinchada.

  let actualCoords = actualPieza.id.split('-'); // nos dará "0-0" --> ["0", "0"]
  let r = parseInt(actualCoords[0]);
  let c = parseInt(actualCoords[1]);

  // Tomo nota de las coodenadas de la pieza vacia.

  let vaciaCoords = piezaVacia.id.split('-'); // nos dará "0-0" --> ["0", "0"]
  let r2 = parseInt(vaciaCoords[0]);
  let c2 = parseInt(vaciaCoords[1]);

  let moveLeft = r === r2 && c2 === c - 1;
  let moveRight = r === r2 && c2 === c + 1;

  let moveUp = c === c2 && r2 === r - 1;
  let moveDown = c === c2 && r2 === r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
  debugger;
  if (isAdjacent) {
    //let piezaA = { ...actualPieza };
    //.grid-flex-box:nth-child(5)
    let actualImg = actualPieza.src;
    let actualImgId = actualPieza.id;
    let actualImgNImg = actualPieza.nImg;
    let actualImgNumOrdImg = actualPieza.nOrdImg;
    //let piezaB = { ...piezaVacia };
    let imagenVacia = piezaVacia.src;
    let imagenVaciaId = piezaVacia.id;
    //let imagenVaciaNImg = piezaVacia.nImg;
    let imagenVaciaOrdImg = piezaVacia.nOrdImg;
    //
    //actualPieza = { ...piezaB };
    //piezaVacia = { ...piezaA };
    actualPieza = document.getElementById(`${imagenVaciaId}`);
    actualPieza.src = imagenVacia;
    actualPieza.id = imagenVaciaId;
    actualPieza.nOrdImg = imagenVaciaOrdImg;
    //  actualPieza.nImg = imagenVaciaNImg;
    piezaVacia = document.getElementById(`${actualImgId}`);
    piezaVacia.src = actualImg;
    piezaVacia.id = actualImgId;
    piezaVacia.nOrdImg = actualImgNumOrdImg;
    piezaVacia.nImg = '0';
    reordenarTablero(actualImgNImg, actualImgNumOrdImg);
    console.log(
      'actualImgNImg',
      actualImgNImg,
      'actualImgNumOrdImg',
      actualImgNumOrdImg,
    );
  }
  debugger;
  renderizarJuego();
}

//reordenar el Grid
//let imgOrder = ['4', '2', '8', '5', '1', '6', '7', '0', '3'];
function renderizarJuego() {
  // const { grid, move, time, status } = this.stat
  // Redibujar el Grid-Tablero
  const newGrid = document.createElement('div');
  newGrid.className = 'grid-tablero';
  newGrid.id = 'tablero';
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Creando las piezas
      let pieza = document.createElement('img');
      pieza.id = r.toString() + '-' + c.toString(); // '0-0'...'2-2'
      pieza.src = '../images/' + imgOrder[i] + '.jpg';
      pieza.nImg = imgOrder[i];
      pieza.nOrdImg = i;
      //debugger;
      if (imgOrder[i] === '0') {
        piezaVacia = { ...pieza };
      }
      i++;
      // Creando los eventos del moviemiento de piezas
      // hacer click en una imagen para mover
      pieza.addEventListener('dragstart', dragStart);
      // mover una imagen mientras esta clikeada.
      pieza.addEventListener('dragover', dragOver);
      // dejar una imagen en otro lugar
      pieza.addEventListener('dragenter', dragEnter);
      // arrastrar la imagen a otra imagen
      pieza.addEventListener('dragleave', dragLeave);
      // arrastrar la imagen a otra imagen, suelta la imagen
      pieza.addEventListener('drop', dragDrop);
      // despues de arrastrar y soltar, intercambie los dos piezas
      pieza.addEventListener('dragend', dragEnd);
      //      debugger;
      newGrid.append(pieza);

      //setTimeout(document.getElementById('tablero').append(pieza), 2000);
      if (r === rows - 1 && c === cols - 1) {
        piezaFuera = document.querySelector('.img-pieza-fuera');
        piezaFuera = { ...pieza };
        //piezaVacia = { ...pieza };
        piezaFuera.src = '../images/0.jpg';
        piezaFuera.id = 'vacia';
        // piezaVacia.src = piezaFuera.src;
        // piezaVacia.id = 'vacia';
        // ultimaPieza.src = '../images/9.jpg';
        // piezaFuera = pieza;
        piezaFuera.src = '../images/9.jpg';
        piezaFuera.id = '2-2';
        document.getElementById('img-pieza-fuera').src = piezaFuera.src;
        // debugger;
      }
      //      debugger;
    }
  }
  document.getElementById('tablero').replaceWith(newGrid);

  //  debugger;
  // Renderizar boton y contadores
  //    const newBoton = document.createElement('button');
  const newBoton = document.querySelector('.btn-empezar');
  //if (status === 'empezar') newBoton.textContent = 'Jugar';
  //if (status === 'jugando') newBoton.textContent = 'Resetear';
  //if (status === 'gano') newBoton.textContent = 'Jugar';
  newBoton.addEventListener('click', () => {
    clearInterval(this.ponerId);
    this.ponerId = setInterval(this.tiempo, 1000);
    //  this.setState(State.start());
  });
  document.querySelector('.btn-empezar').replaceWith(newBoton);
  document.getElementById('movimientos').textContent = 'mov';
  document.getElementById('tiempo').textContent = 'tim';
  // mensaje cuando el puzzle es Completado
  // status == 'gano';
  debugger;
  //if (status === 'gano') {
  //  for (let i = 0; i < 1000; i++) {
  //    document.querySelector('.mensaje-gano').textContent = '';
  //    for (let t = 0; (t = 1000); t++) {
  //      document.querySelector('.mensaje-gano').textContent =
  //        '!!! Puzzle Completado ¡¡¡';
  //    }
  //  }
  //  //      document.querySelector('.mensaje-gano').textContent =
  //  //        '!!! Puzzle Completado ¡¡¡';
  //} else {
  //  document.querySelector('.mensaje-gano').textContent = '';
  //}
}

// const newBoton = document.querySelector('.btn-empezar');
// if (status === 'empezar') newBoton.textContent = 'Jugar';
// if (status === 'jugando') newBoton.textContent = 'Resetear';
// if (status === 'gano') newBoton.textContent = 'Jugar';
// newBoton.addEventListener('click', () => {
//   clearInterval(this.ponerId);
//   this.ponerId = setInterval(this.tiempo, 1000);
//   this.setState(State.start());
// });
// document.querySelector('.btn-empezar').replaceWith(newBoton);

// document.getElementById('movimientos').textContent = move;

// document.getElementById('tiempo').textContent = time;

// mensaje cuando el puzzle es Completado
// status == 'gano';
// debugger;
// if (status === 'gano') {
//   for (let i = 0; i < 1000; i++) {
//     document.querySelector('.mensaje-gano').textContent = '';
//     for (let t = 0; (t = 1000); t++) {}
//     document.querySelector('.mensaje-gano').textContent =
//       '!!! Puzzle Completado ¡¡¡';
//   }
//
//   //      document.querySelector('.mensaje-gano').textContent =
//   //        '!!! Puzzle Completado ¡¡¡';
// } else {
//   document.querySelector('.mensaje-gano').textContent = '';
// }

function reordenarTablero(actualImgNImg, actualImgNumOrdImg) {
  //averiguo el numero indice de la imagen vacia
  console.log('imgOrder antes de cambiar posiciones', imgOrder);
  const index = imgOrder.indexOf('0');
  console.log(index, parseInt(actualImgNumOrdImg));
  imgOrder.splice(index, 1, actualImgNImg);
  console.log(
    'imgOrder despues de cambiar la posicion de la imagen actual a la vacia',
    imgOrder,
  );
  imgOrder.splice(parseInt(actualImgNumOrdImg), 1, '0');
  console.log(
    'imgOrder despues de cambiar la posicion de la imagen vacia a la actual anterior',
    imgOrder,
  );
  comprobarSiCompleto(imgOrder, imgOrderResultadoCorrecto);
  return imgOrder;
}

function comprobarSiCompleto(imgOrder, imgOrderResultadoCorrecto) {
  for (let i = 0; i < rows * cols - 2; i++) {
    debugger;
    if (imgOrder[i] !== imgOrderResultadoCorrecto[i]) {
      siCompleto = false;
      console.log(siCompleto);
      return siCompleto;
    }
    siCompleto = true;
  }

  console.log(siCompleto);
  return siCompleto;
}
//window.onload = iniciarJuego();
export default Juego;
