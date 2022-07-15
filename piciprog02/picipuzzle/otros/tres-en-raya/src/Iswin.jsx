const jugadasGanadoras = [
  '012',
  '036',
  '048',
  '147',
  '246',
  '258',
  '345',
  '678',
];

export default function verificarGanador(jugadas) {
  let gana = false;
  if (jugadas.length > 2) {
    const string = jugadas.join('');
    console.log({ string });
    jugadasGanadoras.forEach((combinacionGanadora) => {
      const gano = combinacionGanadora
        .split('')
        .every((numeroGanador) => string.includes(numeroGanador));

      if (gano) {
        gana = true;
      }
    });
  }
  return gana;
}
