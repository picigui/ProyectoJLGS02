var ganaciones = ['papel-piedra', 'piedra-tijeras', 'tijeras-papel'];
var opciones = ['papel', 'piedra', 'tijeras'];
var contador = 0;
while (contador < 5) {
  var j1 = prompt('j1').toLowerCase();
  var j2 = prompt('j2').toLowerCase();

  if (!opciones.includes(j1) || !opciones.includes(j2)) {
    alert('Valores raros');
  } else if (j1 === j2) {
    alert('Empatan');
  } else {
    const winner = ganaciones.includes(`${j1}-${j2}`) ? '1' : '2';
    alert(`Gana jugador ${winner}`);
  }
  contador++;
}
