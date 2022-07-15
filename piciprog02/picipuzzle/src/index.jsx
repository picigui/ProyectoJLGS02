import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
//import App from './pages/Home';
import App from './components/Recortar';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
// root.render(<App />);
