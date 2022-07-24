import React, { useReducer } from 'react';
import styled from 'styled-components';
import 'react-image-crop/dist/ReactCrop.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/juego.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import piezaFuera from '../assets/0.jpg';
import { useEffect } from 'react';

// valores que debo recibir de la pagina home
// console.log(fotoElegida);
//let imageURL;

const EstiloButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  border: 2px solid;
  .link {
    font-size: 1.5rem;
    margin-left: 10px;
    text-align: center;
    text-decoration: none;
    color: black;
  }
`;

// Valores iniciales para los reduce de esta pagina

function init(initial) {
  debugger;
  return {
    iniciado: false,
    apaisada: false,
    nivelSeleccionado: 'n1',
    ancho: 300,
    alto: 400,
    columnas: 3,
    filas: 4,
    imagen300x400: '../assets/imagen06.jpg',
    piezaFuera: '../assets/0.jpg',
    piezaVacia: '../assets/0.jpg',
    piezas: [],
    ...initial,
    //    ordenPiezas: arrayPiezas,
  };
}

function juegoReducer(state, action) {
  switch (action.type) {
    case 'crearPiezas':
      return { ...state, piezas: action.payload };
    case 'iniciado':
      return { ...state, iniciado: true };
    // ************** si el dispatch no tiene case *****************
    default:
      throw new Error();
  }
}

function Juego(initialStateJuego) {
  // vamos a crear una variable objeto para almacenar todos los datos
  // que nos interesan pasar a otra pagina
  const store = useSelector((store) => store);
  const [state, dispatch] = useReducer(juegoReducer, store, init);
  //const [pieza, setPiezas] = useState([]);

  let piezaVacia;
  let piezaFuera;
  let siCompleto = false;

  let imgOrderResultadoCorrecto = [];
  //let imgOrder = [4, 2, 8, 5, 1, 10, 6, 7, 0, 3, 9, 11];
  let imgOrderRamdon = [];

  let actualPieza;
  let ultimaPieza;

  useEffect(() => {
    if (state.iniciado === false) {
      dispatch({ type: 'iniciado' });
      state.iniciado = true;
      // setTimeout(() => {
      //   crearPiezasCanvas();
      // }, 200);
      crearPiezasCanvas();
    }
  }, []);
  //debugger;
  function crearPiezasCanvas() {
    debugger;
    let arrayPiezas = [];
    let i = 0;
    let piezaCanvas = document.createElement('canvas');
    const imagen300x400 = document.querySelector('.img-foto');
    for (let r = 0; r < state.filas; r++) {
      for (let c = 0; c < state.columnas; c++) {
        // ************ Creando las piezas canvas *********************
        // piezaCanvas.id = arrayCanvas[i].nombCanvas;
        piezaCanvas.width = state.ancho / state.columnas;
        piezaCanvas.height = state.alto / state.filas;
        let posW = r - piezaCanvas.width * c;
        let posH = c - piezaCanvas.height * r;

        let ctx = piezaCanvas.getContext('2d');
        //debugger;
        ctx.drawImage(imagen300x400, posW, posH, state.ancho, state.alto);
        // Creando las piezas imagenes
        const dataURL = piezaCanvas.toDataURL();
        arrayPiezas.push({
          id: `img${r.toString()}-${c.toString()}`,
          src: dataURL,
          nImg: i + 1,
          nOrdImg: i,
        });

        // se inicia la variable con la colocacion correcta
        imgOrderResultadoCorrecto[i] = i + 1;
        imgOrderRamdon[i] = i + 1;
        //debugger;
        if (r === state.filas - 1 && c === state.columnas - 1) {
          ultimaPieza = { ...arrayPiezas[i] };
          const piezaVacia = document.querySelector('.img-pieza-fuera');
          ctx.drawImage(piezaVacia, posW, posH, state.ancho, state.alto);
          const dataURL = piezaCanvas.toDataURL();
          piezaFuera = document.querySelector('.img-pieza-fuera');
          piezaFuera.src = dataURL;
          piezaFuera.id = 'vacia';
          piezaFuera.nImg = i + 1;
          piezaFuera.nOrdImg = i;
          imgOrderRamdon[i] = 0;

          debugger;
        }
        i++;
      }
    }
    dispatch({ type: 'crearPiezas', payload: arrayPiezas });
    //  setPiezas(arrayPiezas);
  }

  // ****** Creando los eventos del moviemiento de piezas *******
  // hacer click en una imagen para mover
  function dragStart() {
    //  debugger;
    actualPieza = this;
  }
  // mover una imagen mientras esta clikeada.
  function dragOver(e) {
    e.preventDefault();
  }
  // dejar una imagen en otro lugar
  function dragEnter(e) {
    e.preventDefault();
  }
  // arrastrar la imagen a otra imagen
  function dragLeave(e) {
    e.preventDefault();
  }
  // arrastrar la imagen a otra imagen, suelta la imagen
  function dragDrop(e) {
    console.log(e.nImg);
    if (e.nImg === '0') {
      piezaVacia = e;
    } // esto se refiere a la pieza que se coloca encima
  }

  // despues de arrastrar y soltar, intercambie los dos piezas
  function dragEnd(e) {
    //debugger;

    if (piezaFuera.id === 'vacia') {
      return;
    }
    // Tomo nota de las coodenadas de la pieza pinchada.
    const actualPieza = e.target;
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
    //debugger;
    //renderizarJuego();
  }

  //reordenar el Grid
  //let imgOrderRamdon = ['4', '2', '8', '5', '1', '6', '7', '0', '3'];
  // function renderizarJuego() {
  //   // const { grid, move, time, status } = this.stat
  //   // Redibujar el Grid-Tablero
  //   const newGrid = document.createElement('div');
  //   newGrid.className = 'grid-tablero';
  //   newGrid.id = 'tablero';
  //   let i = 0;
  //   for (let r = 0; r < filas; r++) {
  //     for (let c = 0; c < columnas; c++) {
  //       // Creando las piezas
  //       let pieza = document.createElement('img');
  //       pieza.id = r.toString() + '-' + c.toString(); // '0-0'...'2-2'
  //       pieza.src = '../images/' + imgOrderRamdon[i] + '.jpg';
  //       pieza.nImg = imgOrderRamdon[i];
  //       pieza.nOrdImg = i;
  //       //debugger;
  //       if (imgOrderRamdon[i] === '0') {
  //         piezaVacia = { ...pieza };
  //       }
  //       i++;
  //       // Creando los eventos del moviemiento de piezas
  //       // hacer click en una imagen para mover
  //       pieza.addEventListener('dragstart', dragStart);
  //       // mover una imagen mientras esta clikeada.
  //       pieza.addEventListener('dragover', dragOver);
  //       // dejar una imagen en otro lugar
  //       pieza.addEventListener('dragenter', dragEnter);
  //       // arrastrar la imagen a otra imagen
  //       pieza.addEventListener('dragleave', dragLeave);
  //       // arrastrar la imagen a otra imagen, suelta la imagen
  //       pieza.addEventListener('drop', dragDrop);
  //       // despues de arrastrar y soltar, intercambie los dos piezas
  //       pieza.addEventListener('dragend', dragEnd);
  //       //      debugger;
  //       newGrid.append(pieza);

  //       //setTimeout(document.getElementById('tablero').append(pieza), 2000);
  //       if (r === filas - 1 && c === columnas - 1) {
  //         piezaFuera = document.querySelector('.img-pieza-fuera');
  //         piezaFuera = { ...pieza };
  //         //piezaVacia = { ...pieza };
  //         piezaFuera.src = '../images/0.jpg';
  //         piezaFuera.id = 'vacia';
  //         // piezaVacia.src = piezaFuera.src;
  //         // piezaVacia.id = 'vacia';
  //         // ultimaPieza.src = '../images/9.jpg';
  //         // piezaFuera = pieza;
  //         piezaFuera.src = '../images/9.jpg';
  //         piezaFuera.id = '2-2';
  //         document.getElementById('img-pieza-fuera').src = piezaFuera.src;
  //         // debugger;
  //       }
  //       //      debugger;
  //     }
  //   }
  //   document.getElementById('tablero').replaceWith(newGrid);

  //   //  debugger;
  //   // Renderizar boton y contadores
  //   //    const newBoton = document.createElement('button');
  //   const newBoton = document.querySelector('.btn-empezar');
  //   //if (status === 'empezar') newBoton.textContent = 'Jugar';
  //   //if (status === 'jugando') newBoton.textContent = 'Resetear';
  //   //if (status === 'gano') newBoton.textContent = 'Jugar';
  //   newBoton.addEventListener('click', () => {
  //     clearInterval(this.ponerId);
  //     this.ponerId = setInterval(this.tiempo, 1000);
  //     //  this.setState(State.start());
  //   });
  //   document.querySelector('.btn-empezar').replaceWith(newBoton);
  //   document.getElementById('movimientos').textContent = 'mov';
  //   document.getElementById('tiempo').textContent = 'tim';
  //   // mensaje cuando el puzzle es Completado
  //   // status == 'gano';
  //   debugger;
  //   //if (status === 'gano') {
  //   //  for (let i = 0; i < 1000; i++) {
  //   //    document.querySelector('.mensaje-gano').textContent = '';
  //   //    for (let t = 0; (t = 1000); t++) {
  //   //      document.querySelector('.mensaje-gano').textContent =
  //   //        '!!! Puzzle Completado ¡¡¡';
  //   //    }
  //   //  }
  //   //  //      document.querySelector('.mensaje-gano').textContent =
  //   //  //        '!!! Puzzle Completado ¡¡¡';
  //   //} else {
  //   //  document.querySelector('.mensaje-gano').textContent = '';
  //   //}
  // }

  function reordenarTablero(actualImgNImg, actualImgNumOrdImg) {
    //averiguo el numero indice de la imagen vacia
    console.log('imgOrderRamdon antes de cambiar posiciones', imgOrderRamdon);
    const index = imgOrderRamdon.indexOf('0');
    console.log(index, parseInt(actualImgNumOrdImg));
    imgOrderRamdon.splice(index, 1, actualImgNImg);
    console.log(
      'imgOrderRamdon despues de cambiar la posicion de la imagen actual a la vacia',
      imgOrderRamdon,
    );
    imgOrderRamdon.splice(parseInt(actualImgNumOrdImg), 1, '0');
    console.log(
      'imgOrderRamdon despues de cambiar la posicion de la imagen vacia a la actual anterior',
      imgOrderRamdon,
    );
    comprobarSiCompleto(imgOrderRamdon, imgOrderResultadoCorrecto);
    return imgOrderRamdon;
  }

  function comprobarSiCompleto(imgOrderRamdon, imgOrderResultadoCorrecto) {
    for (let i = 0; i < state.filas * state.columnas - 2; i++) {
      debugger;
      if (imgOrderRamdon[i] !== imgOrderResultadoCorrecto[i]) {
        siCompleto = false;
        console.log(siCompleto);
        return siCompleto;
      }
      siCompleto = true;
    }

    console.log(siCompleto);
    return siCompleto;
  }

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
            <div
              className={`foto-elegida ${
                state.apaisada === true ? 'foto-apaisada' : 'foto-apaisada-no'
              }`}
            >
              <img
                className="img-foto"
                src={state.imagen300x400}
                alt="imagen elegida"
              ></img>
            </div>
          </div>

          {/*************** Mensaje para presentar al final del juego *************/}
          <h2 className="mensaje-gano">!!! Puzzle Completado ¡¡¡</h2>

          {/*************** Relleno del tablero de juego en canvas **************/}
          {/*************** presentacion del tablero de juego ********************/}
          <div
            className={`grid-tablero ${
              state.apaisada === true
                ? 'grid-tablero-apaisado'
                : 'grid-tablero-apaisado-no'
            } grid-${state.nivelSeleccionado}`}
          >
            {state.piezas.map((img, index) => {
              return (
                <img
                  onDragStart={(e) => dragStart(e)}
                  onDragOver={(e) => dragOver(e)}
                  onDragEnter={(e) => dragEnter(e)}
                  onDragLeave={(e) => dragLeave(e)}
                  onDrop={(e) => dragDrop(e)}
                  onDragEnd={(e) => dragEnd(e)}
                  src={img.src}
                  id={img.id}
                  key={img.id}
                  alt={img.id}
                ></img>
              );
            })}
          </div>

          {/***** Grid que contiene el avance del juego y la ultima pieza *******/}
          <div
            className={`grid-ultima-pieza ${
              state.apaisada === true ? 'grid-apaisado' : 'grid-apaisado-no'
            }`}
          >
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
            <div className="div-img-pieza-fuera">
              <img
                className="img-pieza-fuera"
                src={state.piezaFuera}
                // id={piezaFuera.id}
                alt="img-pieza-fuera"
                onDragStart={(e) => dragStart(e)}
                onDragOver={(e) => dragOver(e)}
                onDragEnter={(e) => dragEnter(e)}
                onDragLeave={(e) => dragLeave(e)}
                onDrop={(e) => dragDrop(e)}
                onDragEnd={(e) => dragEnd(e)}
              />
            </div>
          </div>
        </div>
        <EstiloButton>
          <Link className="link" to="/">
            Home
          </Link>
        </EstiloButton>
      </main>
      <Footer />
    </>
  );
}
export default Juego;

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

// // ********** Cambio de la imagen elegida ***********
// case 'apaisada':
//   ancho = 400;
//   alto = 300;
//   if (state.nivelSeleccionado === 'n1') {
//     columnas = 4;
//     filas = 3;
//   }
//   if (state.nivelSeleccionado === 'n2') {
//     columnas = 6;
//     filas = 4;
//   }
//   if (state.nivelSeleccionado === 'n3') {
//     columnas = 8;
//     filas = 6;
//   }
//   return { ...state, columnas, filas, ancho, alto };
// case 'apaisadaNo':
//   ancho = 300;
//   alto = 400;
//   if (state.nivelSeleccionado === 'n1') {
//     columnas = 3;
//     filas = 4;
//   }
//   if (state.nivelSeleccionado === 'n2') {
//     columnas = 4;
//     filas = 6;
//   }
//   if (state.nivelSeleccionado === 'n3') {
//     columnas = 6;
//     filas = 8;
//   }
//   return { ...state, columnas, filas, ancho, alto };
