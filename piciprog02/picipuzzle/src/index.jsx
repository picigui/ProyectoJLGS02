import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
//import { Provider } from 'react-redux';
//import { store } from './app/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//import reportWebVitals from './reportWebVitals';
// import App from './pages/Home';
//import img1 from './assets/titanic1.jpg';
//import App from './components/Recortar';
//import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
// root.render(<App />);

// Si desea comenzar a medir el rendimiento en su aplicación, pase una función
// para registrar resultados (por ejemplo: reportWebVitals(console.log))
// o enviar a un punto final de análisis. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
// 682928966 bizum chino 29,15€
