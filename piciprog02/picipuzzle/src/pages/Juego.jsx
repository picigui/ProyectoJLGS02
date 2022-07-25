import React, { useReducer } from 'react';
import styled from 'styled-components';
import 'react-image-crop/dist/ReactCrop.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/juego.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import imagenVacia from '../assets/0.jpg';

// valores que debo recibir de la pagina home
// console.log(fotoElegida);
//let imageURL;

const EstiloButton = styled.button`
  display: flex;
  border-radius: 3px;
  width: 6rem;
  background-color: yellow;

  border: 2px solid black;
  .link {
    font-size: 1.5rem;
    margin: 0;
    text-align: center;
    text-decoration: none;
    background-color: yellow;

    color: black;
  }
`;

// Valores iniciales para los reduce de esta pagina

function init(initial) {
  return {
    iniciado: false,
    apaisada: false,
    nivelSeleccionado: 'n1',
    ancho: 300,
    alto: 400,
    columnas: 3,
    filas: 4,
    imagen300x400: '../assets/imagen06.jpg',
    piezaFuera: imagenVacia,
    piezaVacia: imagenVacia,
    piezas: [],
    piezasOrdenCorrecto: [],
    ...initial,
    //    ordenPiezas: arrayPiezas,
  };
}

function juegoReducer(state, action) {
  switch (action.type) {
    case 'crearPiezas':
      return {
        ...state,
        piezas: action.payload.arrayPiezas,
        piezasOrdenCorrecto: JSON.parse(
          JSON.stringify(action.payload.arrayPiezas),
        ),
        piezaFuera: action.payload.piezaFuera.src,
        piezaVacia: action.payload.piezaVacia,
      };
    case 'iniciado':
      return { ...state, iniciado: true };
    case 'piezas':
      return { ...state, piezas: action.payload };
    case 'piezaFuera':
      return { ...state, piezaFuera: action.payload.src };
    case 'cambioPiezaVacia':
      const estaOrdenado =
        JSON.stringify(state.piezas.slice(0, state.piezas.length - 1)) ===
        JSON.stringify(
          state.piezasOrdenCorrecto.slice(
            0,
            state.piezasOrdenCorrecto.length - 1,
          ),
        );
      if (estaOrdenado) {
        alert('Ganaste');
      }
      return { ...state, piezaVacia: state.piezas[action.payload] };
    case 'empezarJuego':
      return {
        piezaFuera: action.payload[action.payload.length - 1].src,
      };
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
  //let ultimaPieza;
  //let siCompleto = false;

  let imgOrderResultadoCorrecto = [];
  //let imgOrder = [4, 2, 8, 5, 1, 10, 6, 7, 0, 3, 9, 11];
  let imgOrderRamdon = [];

  useEffect(() => {
    if (state.iniciado === false) {
      dispatch({ type: 'iniciado' });
      state.iniciado = true;
      // setTimeout(() => {
      //   crearPiezasCanvas();
      // }, 200);
      crearPiezasCanvas();
    }
  });

  //debugger;
  function crearPiezasCanvas() {
    let arrayPiezas = [];
    let piezaCanvas = document.createElement('canvas');
    const imagen300x400 = document.querySelector('.img-foto');
    let piezaFuera = {};
    let i = 0;
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
          id: `${r.toString()}-${c.toString()}`,
          src: dataURL,
          idTablero: `${r.toString()}-${c.toString()}`,
        });

        // se inicia la variable con la colocacion correcta
        imgOrderResultadoCorrecto[i] = i + 1;
        imgOrderRamdon[i] = i + 1;
        if (r === state.filas - 1 && c === state.columnas - 1) {
          //  let ultimaPieza={};
          //  ultimaPieza = { ...arrayPiezas[i] };
          let piezaVacia = document.querySelector('.img-pieza-fuera');
          ctx.drawImage(piezaVacia, posW, posH, state.ancho, state.alto);
          const dataURL = piezaCanvas.toDataURL();
          // piezaFuera = document.querySelector('.img-pieza-fuera');
          piezaFuera.src = dataURL;
          piezaFuera.id = 'vacia';
          // piezaFuera.nImg = i + 1;
          // piezaFuera.nOrdImg = i;
          piezaVacia = { ...piezaFuera };
        }
        i++;
      }
    }
    dispatch({
      type: 'crearPiezas',
      payload: { arrayPiezas, piezaFuera, piezaVacia },
    });
  }

  // ****** Creando los eventos del movimiento de piezas *******
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
    e.preventDefault();
  }

  // despues de arrastrar y soltar, intercambie los dos piezas
  function dragEnd(pieza) {
    //debugger;
    // Tomo nota de las coodenadas de la pieza pinchada.
    let actualPieza = pieza;
    debugger;
    let actualCoords = actualPieza.idTablero.split('-'); // nos dará "0-0" --> ["0", "0"]
    let r = parseInt(actualCoords[0]);
    let c = parseInt(actualCoords[1]);

    // Tomo nota de las coodenadas de la pieza vacia.

    let vaciaCoords = state.piezaVacia.idTablero.split('-'); // nos dará "0-0" --> ["0", "0"]
    let r2 = parseInt(vaciaCoords[0]);
    let c2 = parseInt(vaciaCoords[1]);

    let moveLeft = r === r2 && c2 === c - 1;
    let moveRight = r === r2 && c2 === c + 1;

    let moveUp = c === c2 && r2 === r - 1;
    let moveDown = c === c2 && r2 === r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    if (isAdjacent) {
      const copia = state.piezaVacia;
      const indexPiezaVacia = state.piezas.findIndex(
        (p) => p.id === state.piezaVacia.id,
      );
      const indexPiezaActual = state.piezas.findIndex(
        (p) => p.id === actualPieza.id,
      );
      const nuevasPiezas = [...state.piezas];
      nuevasPiezas[indexPiezaActual] = copia;
      nuevasPiezas[indexPiezaVacia] = state.piezas[indexPiezaActual];
      const idsEnOrden = state.piezasOrdenCorrecto.map((p) => p.id);
      nuevasPiezas.forEach((p, index) => (p.idTablero = idsEnOrden[index]));
      dispatch({ type: 'piezas', payload: nuevasPiezas });
      dispatch({ type: 'cambioPiezaVacia', payload: indexPiezaActual });
    }
  }

  function empezarJuego() {
    const copia = JSON.parse(JSON.stringify(state.piezasOrdenCorrecto));
    const idsEnOrden = copia.map((p) => p.id);
    const ultimaPieza = copia.pop();
    dispatch({
      type: 'piezaFuera',
      payload: JSON.parse(JSON.stringify(ultimaPieza)),
    });
    shuffle(copia);
    copia.push(ultimaPieza);
    ultimaPieza.src = imagenVacia;
    debugger;
    idsEnOrden.forEach((id, index) => (copia[index].idTablero = id));
    dispatch({ type: 'piezas', payload: copia });
    dispatch({ type: 'cambioPiezaVacia', payload: copia.length - 1 });
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
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
          {/*************** presentacion del tablero de juego ********************/}
          <div className="contenedor-tablero">
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
                    onDragOver={(e) => dragOver(e)}
                    onDragEnter={(e) => dragEnter(e)}
                    onDragLeave={(e) => dragLeave(e)}
                    onDrop={(e) => dragDrop(e)}
                    onDragEnd={(e) => dragEnd(img)}
                    src={img.src}
                    id={img.id}
                    key={img.id}
                    alt={img.id}
                  ></img>
                );
              })}
            </div>
            {/*************** Mensaje para presentar al final del juego *************/}
            <h2 className="mensaje-gano">!!! Puzzle Completado ¡¡¡</h2>

            {/***** Grid que contiene el avance del juego y la ultima pieza *******/}
            <div
              className={`grid-ultima-pieza ${
                state.apaisada === true ? 'grid-apaisado' : 'grid-apaisado-no'
              }`}
            >
              <div className="h3-mov-time">
                <h3 className="h3-movimientos">
                  Pasos: <span id="movimientos">0</span>
                </h3>
                <h3 className="h3-tiempo">Tiempo:</h3>
                <span id="tiempo">0</span>
              </div>
              <div className="Botones">
                <div className="empezar">
                  <button
                    onClick={empezarJuego}
                    className="btn-empezar"
                    type="button"
                  >
                    Empezar
                  </button>
                  <EstiloButton>
                    <Link className="link" to="/">
                      Home
                    </Link>
                  </EstiloButton>
                </div>
              </div>
              <div className="div-img-pieza-fuera">
                <img
                  className="img-pieza-fuera"
                  src={state.piezaFuera}
                  // id={piezaFuera.id}
                  alt="img-pieza-fuera"
                  onDragOver={(e) => dragOver(e)}
                  onDragEnter={(e) => dragEnter(e)}
                  onDragLeave={(e) => dragLeave(e)}
                  onDrop={(e) => dragDrop(e)}
                  onDragEnd={(e) => dragEnd(e)}
                />
              </div>
            </div>
          </div>

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
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Juego;
