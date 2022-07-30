// Para recuperar los datos que tenemos guardados en un indice de nuestro almacenamiento local del navegador
export function getRecords(level) {
  if (`record_${level}` in localStorage) {
    return JSON.parse(localStorage.getItem(`record_${level}`));
  } else {
    if (level === 'n1') {
      return { player: 'Pici', seconds: 1 * 2 * 60, level: level };
    }
    if (level === 'n2') {
      return { player: 'Pici', seconds: 1 * 30 * 60, level: level };
    }
    if (level === 'n3') {
      return { player: 'Pici', seconds: 2 * 60 * 60, level: level };
    }
  }
}
// Para almacenar datos y guardar nuevos elementos o indices en el LocalStorage
// localStorage.setItem("titulo", "Nuestro almacen de datos");

// Para guardar un objeto primero debemos convertirlo en un string json ya que el localstorage no permite guardar objetos de JavaSciprt como tal.

export function saveNewRecord(name, seconds, level) {
  localStorage.setItem(
    `record_${level}`,
    JSON.stringify({ player: name, seconds: seconds, level: level }),
  );
}
