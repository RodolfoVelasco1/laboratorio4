const { log } = require("console");
const { crearArchivo, obtenerFecha, agregarContenido, abrirArchivo } = require("./funciones");

// Ejercicio 1

crearArchivo("log.txt", "");

agregarContenido("log.txt", `${obtenerFecha()} - Inicio del programa`);

agregarContenido("log.txt", `${obtenerFecha()} - Ejecutando tarea...`);

setTimeout(() => {
  agregarContenido("log.txt", `${obtenerFecha()} - Tarea completada`);
  abrirArchivo("log.txt");
}, 5000);

