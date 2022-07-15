import logo from './logo-pici130x177t.png';
import '../styles/App.css';
import React, { useState } from 'react';
import img1 from '../assets/logo-pici300x400.jpeg';
import iconFacebook from '../assets/icon-facebook.svg';
import iconTwitter from '../assets/icon-twitter.svg';
import iconInstagram from '../assets/icon-instagram.svg';
import iconEmail from '../assets/icon-email.png';
import { Header } from '../components/Header';

function App() {
  const [imageURL, setImageUrl] = useState(img1);
  var c = document.getElementById('myCanvas');
  c.imgSrc = imageURL;
  var ctx = c.getContext('2d');
  ctx.fillRect(100, 10, 300, 600);

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
  return (
    <>
      <Header />
      <main>
        <h2>Configura tu imagen del Pici-Puzzle</h2>
        <div className="elegir-fuente-imagen">
          <input
            type="radio"
            name="tipo-de-fuente-img"
            id="basicas"
            select="true"
          />
          <label for="basicas"> Imagenes incluidas </label>

          <input type="radio" name="tipo-de-fuente-img" id="api" />
          <label for="api"> De una API: </label>
          <input type="radio" name="tipo-de-fuente-img" id="mis-archivos" />
          <label for="mis-archivos"> De tus Galeria </label>
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

        <h1>The canvas element</h1>

        <canvas id="myCanvas">
          Your browser does not support the canvas tag.
        </canvas>
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
//debugger;
export default App;
