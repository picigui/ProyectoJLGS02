import { useState } from 'react';

import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

function App() {
  const [src, setSrc] = useState(null);

  const [crop, setCrop] = useState({ aspect: 16 / 9 });

  const [image, setImage] = useState(null);

  const [output, setOutput] = useState(null);

  // const selectImage = (file) => {
  //   setSrc(URL.createObjectURL(file));
  //   console.log(file);
  // };

  function selectImage(event) {
    //if (event){
    let file = event.target.files[0];
    console.log(event.target.files[0]);
    //let file = '../images/logo-pici.jpeg';
    let reader = new FileReader('');
    reader.onload = function (event) {
      setSrc(event.target.result);
      console.log(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  const cropImageNow = () => {
    debugger;
    const canvas = document.createElement('canvas');

    const scaleX = image.naturalWidth / image.width;

    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;

    canvas.height = crop.height;

    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;

    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,

      crop.x * scaleX,

      crop.y * scaleY,

      crop.width * scaleX,

      crop.height * scaleY,

      0,

      0,

      crop.width,

      crop.height,
    );

    const base64Image = canvas.toDataURL('image/jpeg');

    setOutput(base64Image);
  };

  return (
    <div className="App">
      <center>
        <input type="file" accept="image/*" onChange={selectImage} />

        <br />

        <br />

        <div>
          {src && (
            <div>
              <ReactCrop
                src={src}
                onImageLoaded={setImage}
                crop={crop}
                onChange={setCrop}
              />

              <br />

              <button onClick={cropImageNow}>Crop</button>

              <br />

              <br />
            </div>
          )}
        </div>

        <div>{output && <img src={output} alt="imagen nueva" />}</div>
      </center>
    </div>
  );
}

export default App;
