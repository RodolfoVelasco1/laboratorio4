const { contarPalabras } = require("./funciones");
const [, , nombreIngresado, palabraIngresada] = process.argv;
const nombre = nombreIngresado || "archivo.txt";
const palabra = palabraIngresada || "palabras";
contarPalabras(nombre, palabra);
