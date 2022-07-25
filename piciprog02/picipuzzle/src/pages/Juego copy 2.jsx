import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet';
//import { Link } from 'react-router-dom';
import iconFacebook from '../assets/icon-facebook.svg';
import iconTwitter from '../assets/icon-twitter.svg';
import iconInstagram from '../assets/icon-instagram.svg';
import iconEmail from '../assets/icon-email.png';
import logo from './logo-pici130x177t.png';
//import '../styles/juego.css';
import { Header } from '../components/Header';
import img1 from '../assets/imagen06.jpg';

let rows = 3;
let cols = 3;
let actualPieza;
let piezaVacia;
let piezaFuera;
let siCompleto = false;

let arrayCanvas = [
  { nombCanvas: 'canvas00', posW: '0', posH: '0' },
  { nombCanvas: 'canvas01', posW: '0', posH: '-100' },
  { nombCanvas: 'canvas02', posW: '0', posH: '-200' },
  { nombCanvas: 'canvas03', posW: '-100', posH: '0' },
  { nombCanvas: 'canvas04', posW: '-100', posH: '-100' },
  { nombCanvas: 'canvas05', posW: '-100', posH: '-200' },
  { nombCanvas: 'canvas06', posW: '-200', posH: '0' },
  { nombCanvas: 'canvas07', posW: '-200', posH: '-100' },
  { nombCanvas: 'canvas08', posW: '-200', posH: '-200' },
];
let arrayPiezas = [
  { id: 'img0-0', src: './logo-pici130x177t.png', nImg: '1', nOrdImg: '0' },
  { id: 'img0-1', src: './logo-pici130x177t.png', nImg: '2', nOrdImg: '1' },
  { id: 'img0-2', src: './logo-pici130x177t.png', nImg: '3', nOrdImg: '2' },
  { id: 'img1-0', src: './logo-pici130x177t.png', nImg: '4', nOrdImg: '3' },
  { id: 'img1-1', src: './logo-pici130x177t.png', nImg: '5', nOrdImg: '4' },
  { id: 'img1-2', src: './logo-pici130x177t.png', nImg: '6', nOrdImg: '5' },
  { id: 'img2-0', src: './logo-pici130x177t.png', nImg: '7', nOrdImg: '6' },
  { id: 'img2-1', src: './logo-pici130x177t.png', nImg: '8', nOrdImg: '7' },
  { id: 'img2-2', src: './logo-pici130x177t.png', nImg: '9', nOrdImg: '8' },
];

// let imagenVacia;
//let imagenVaciaNImg;
// turns = 0;
//let ultimaPieza;
//let pieza;
//let piezaA;
//let piezaB;

// valores que debo recibir de la pagina home
let imageURL = img1;
let apaisada = false;
let nivelSeleccionado = 'n1';

let imgOrderResultadoCorrecto; // = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let imgOrder = ['4', '2', '8', '5', '1', '6', '7', '0', '3'];

function crearPiezasCanvas(imageURL) {
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Creando las piezas canvas
      let ctx = arrayCanvas(i).nombCanvas.getContext('2d');
      ctx.drawImage(imageURL, arrayCanvas(i).posW, arrayCanvas(i).posH);
      // Creando las piezas imagenes
      const dataURL = arrayCanvas(i).nombreVar.toDataURL();
      arrayPiezas(i).id = 'img' + r.toString() + '-' + c.toString(); // 'img0-0'...'img2-2'
      arrayPiezas(i).src = dataURL;
      arrayPiezas(i).nImg = (i + 1).toString;
      arrayPiezas(i).nOrdImg = i;

      // se inicia la variable con la colocacion correcta
      imgOrderResultadoCorrecto[i] = (i + 1).toString;

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
      i++;
    }
  }
}

function agregarEventosImg(piezaImg) {
  // Creando los eventos del moviemiento de piezas
  // hacer click en una imagen para mover
  piezaImg.addEventListener('dragstart', dragStart);
  // mover una imagen mientras esta clikeada.
  piezaImg.addEventListener('dragover', dragOver);
  // dejar una imagen en otro lugar
  piezaImg.addEventListener('dragenter', dragEnter);
  // arrastrar la imagen a otra imagen
  piezaImg.addEventListener('dragleave', dragLeave);
  // arrastrar la imagen a otra imagen, suelta la imagen
  piezaImg.addEventListener('drop', dragDrop);
  // despues de arrastrar y soltar, intercambie los dos piezas
  piezaImg.addEventListener('dragend', dragEnd);
}

// Valores iniciales para los reduce de esta pagina
function init() {
  crearPiezasCanvas();
  return {
    ordenPiezas: arrayPiezas,
    imgOrderResultadoCorrecto: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    imgOrder: ['4', '2', '8', '5', '1', '6', '7', '0', '3'],
  };
}
console.log({ img1 });
function juegoReducer(state, action) {
  debugger;
  switch (action.type) {
    // ********** eleccion de la fuente de la imagen ***********
    case 'imgIncluidas':
      return { ...state, sourceImagen: 'imgIncluidas' };
    case 'imgAPI':
      return { ...state, sourceImagen: 'imgAPI' };
    case 'imgGaleria':
      return { ...state, sourceImagen: 'imgGaleria' };

    // ************** si el dispatch no tiene case *****************
    default:
      throw new Error();
  }
}

function Juego({ initialStateJuego }) {
  debugger;
  const [state, dispatch] = useReducer(juegoReducer, initialStateJuego, init);
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
        <div class="juego">
          {/*************** presentacion de la imagen elegida *******************/}

          <div className="marco-foto">
            <div className="foto" id="apaisadaNo">
              <img id="img1" src={imageURL} alt="imagen elegida" />
            </div>
          </div>

          {/*************** Mensaje para presentar al final del juego *************/}
          <h2 class="mensaje-gano">!!! Puzzle Completado ¡¡¡</h2>

          {/*************** Relleno del tablero de juego en canvas **************/}
          <canvas id="myCanvas">
            Your browser does not support the canvas tag.
          </canvas>
          {/*************** presentacion del tablero de juego ********************/}
          <div class="grid-tablero" id="tablero">
            {state.arrayPiezas.map((img) => (
              <img src={img.src} id={img.id} key={img.src} alt={img.id}>
                {agregarEventosImg(img)}
              </img>
            ))}
          </div>

          {/***** Grid que contiene el avance del juego y la ultima pieza *******/}
          <div class="grid-ultima-pieza">
            <div class="h3-mov-time">
              <h3 class="h3-movimientos">
                Movimientos: <span id="movimientos">0</span>
              </h3>
              <h3 class="h3-tiempo">
                Tiempo: <span id="tiempo">0</span>
              </h3>
              <div class="empezar">
                <button class="btn-empezar" type="button">
                  Empezar
                </button>
              </div>
            </div>
            <img
              class="img-pieza-fuera"
              src="./images/0.jpg"
              id="img-pieza-fuera"
              alt="img-pieza-fuera"
            />
          </div>
          <div class="prueba-img" id="prueba-img"></div>
        </div>
      </main>
      <footer>
        <div className="grid-container_footer">
          <picture className="logo-footer">
            <img src={logo} alt="Logo Pici" />
          </picture>
          <div className="icons-redes">
            <a
              href="https://es-es.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={iconFacebook} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={iconInstagram} alt="Instagram" />
            </a>
          </div>
          <p className="p_icons-contacto">Contacto:</p>
          <div className="div-a-icons">
            <a
              href="mailto:picigui@hotmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src={iconEmail} alt="Icon-mailto:picigui@hotmail.com" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <img src={iconTwitter} alt="Twitter" />
            </a>
          </div>
          <div className="pie-footer">
            <p className="attribution">
              Desde Gran Canaria hecho con <span className="corazon">♥</span>{' '}
              para el mundo.
            </p>
          </div>
        </div>
      </footer>
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
