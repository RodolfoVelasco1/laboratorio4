const { log } = require("console");
const fs = require("fs");

//Ejercicios 1 y 2
function obtenerFecha() {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const segundos = String(fecha.getSeconds()).padStart(2, "0");
  return `[${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}]`;
}

//Ejercicios 1, 2 y 3
function crearArchivo(nombre, contenido){
    fs.writeFileSync(`${nombre}`, contenido, "utf-8")
}

//Ejercicios 1 y 2
function agregarContenido(nombre, mensaje){
  fs.appendFileSync(nombre, mensaje + "\n", "utf-8")
}

//Ejercicios 1 y 2
function abrirArchivo(nombre){
    console.log(fs.readFileSync(nombre, "utf-8"));
}

//Ejercicio 2
function renombrar(nombreViejo, nombreNuevo){
    fs.renameSync(`${nombreViejo}.txt`, `${nombreNuevo}.txt`);
    console.log(`Se cambió el nombre del archivo: De "${nombreViejo}" a "${nombreNuevo}".`);
    
}

//Ejercicio 2
function eliminarArchivo(nombre){
    fs.unlinkSync(`${nombre}.txt`);
    console.log("Archivo eliminado.");
}

//Ejercicio 3
function agregarContacto(nombre, telefono, email){
  const contacto = {
    nombre: nombre,
    telefono: telefono,
    email: email,
  };
  let contactos = JSON.parse(fs.readFileSync("contactos.json", "utf-8"));
  contactos.push(contacto);
  fs.writeFileSync("contactos.json", JSON.stringify(contactos), "utf-8");
  console.log("Contacto agregado.");
  
}

//Ejercicios 3
function mostarContactos(){
  console.log("Mostrando lista de contactos:");
  console.log(fs.readFileSync("contactos.json", "utf-8"));
}

//Ejercicio 3
function eliminarContacto(nombre){
  let contactos = JSON.parse(fs.readFileSync("contactos.json", "utf-8"));
  const contactosActualizados = contactos.filter((contacto) => contacto.nombre !== nombre);
  fs.writeFileSync("contactos.json", JSON.stringify(contactosActualizados), "utf-8");
  console.log("Contacto eliminado.");
  
}

//Ejercicio 4
function contarPalabras(nombre, palabra){
  palabra = palabra.toLowerCase()
  const texto = fs.readFileSync(`${nombre}`, "utf-8");
  const palabras = texto.split(/[.,!?;:\s]+/);
  let contador = 0;
  for (let i=0; i<palabras.length; i++){
    if(palabras[i].toLowerCase() == palabra){
      contador++
    }
  }
  console.log(`Cantidad de veces que aparece la palabra "${palabra}" en el texto: ${contador}.`);
  
}

module.exports = {
  obtenerFecha,
  crearArchivo,
  agregarContenido,
  abrirArchivo,
  renombrar,
  eliminarArchivo,
  agregarContacto,
  mostarContactos,
  eliminarContacto,
  contarPalabras,
};
