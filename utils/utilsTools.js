const fs = require("fs");


exports.readJson = (url) => {
  let jsonStringEth = fs.readFileSync(url, 'utf8');
  // Convertimos la cadena JSON en un objeto JavaScript
  let jsonToJavascript = JSON.parse(jsonStringEth);

  return jsonToJavascript;

}


exports.listWithoutRepeatsContract = function (list) {
  const listWithoutRepeats = list.filter((obj, index, arr) => {
    // utilizamos findIndex() para buscar si existe otro objeto con el mismo valor para el atributo "nombre"
    const indexNombre = arr.findIndex(o => o.address === obj.address);
    // si no existe otro objeto con el mismo valor para "nombre", retornamos true para mantener el objeto en la lista
    return indexNombre === index;
  });
  return listWithoutRepeats;
}

exports.listWithoutRepeatsTopic=function (list) {
  const listWithoutRepeats = list.filter((obj, index, arr) => {
    // utilizamos findIndex() para buscar si existe otro objeto con el mismo valor para el atributo "nombre"
    const indexNombre = arr.findIndex(o => o.topic === obj.topic);
    // si no existe otro objeto con el mismo valor para "nombre", retornamos true para mantener el objeto en la lista
    return indexNombre === index;
  });

  return listWithoutRepeats;
}