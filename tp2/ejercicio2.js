const { crearArchivo, agregarContenido, obtenerFecha, abrirArchivo, renombrar, eliminarArchivo } = require("./funciones");

const contenido = "Nombre: Rodolfo Velasco. \nEdad: 29. \nCarrera: Tecnicatura Universitaria en Programación.";
crearArchivo("datos.txt", contenido);
abrirArchivo("datos.txt");
agregarContenido("datos.txt", `\nFecha de modificación: ${obtenerFecha()}`);
console.log("Contenido agregado.");

abrirArchivo("datos.txt");
renombrar("datos", "informacion");
setTimeout(() => {
    eliminarArchivo("informacion");
  }, 10000);


