//Laboratorio 4 - Examen Node.JS
//Alumno: Rodolfo Nicolás Velasco Fessler

const readline = require('readline');
const fs = require('fs');
const yargs = require('yargs');

//Acá yargs guarda el nombre que ingresó el usuario para el archivo json

const argv = yargs
  .option("file", {
    alias: "f",
    description: "Ingresa el nombre del archivo",
    type: "string",
    demandOption: false,
  })
  .default("file", "productos.json")
  .help()
  .argv;

const nombreArchivo = argv.file;

//Acá pedimos los datos por readline y los guardamos en el objeto

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const preguntar = (pregunta) => {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
};

const solicitarDatos = async () => {
  try {
    const nombre = await preguntar('Producto: ');
    const precio = await preguntar('Precio: $');
    const cantidad = await preguntar('Cantidad: ');
    producto = {
      nombre: nombre,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad),
    };
    rl.close();
    datosEnArchivo(nombreArchivo, producto);
    
  } catch (error) {
    console.error('Error al solicitar datos:', error);
    rl.close();
  }
};

//Con esta función creamos o sobreescribimos el archivo json

function datosEnArchivo(nombreArchivo, producto){
  if (!fs.existsSync(nombreArchivo)) {
    fs.writeFileSync(nombreArchivo, JSON.stringify(producto), 'utf8');
    console.log(`Archivo "${nombreArchivo}" creado.`);
    mostarProductos(nombreArchivo)
  } else {
    console.log(`El archivo "${nombreArchivo}" ya existe.`);
    console.log("Obteniendo datos...");
    let productos = [JSON.parse(fs.readFileSync(`${nombreArchivo}`, "utf-8"))];
    productos.push(producto);
    fs.writeFileSync(`${nombreArchivo}`, JSON.stringify(productos), "utf-8");
    console.log("Producto Agregado.");
    mostarProductos(nombreArchivo)
  
  }
}

//Esta función lee el archivo y lo muestra por consola
function mostarProductos(){
  console.log("Mostrando lista de productos:");
  console.log(fs.readFileSync(`${nombreArchivo}`, "utf-8"));
}

//Programa Principal

solicitarDatos();

