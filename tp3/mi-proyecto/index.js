const yargs = require('yargs');
const fs = require('fs');

const argv = yargs


  .command('saludar', 'Muestra un saludo', {
    nombre: {
      describe: 'Nombre de la persona a saludar',
      demandOption: false,
      type: 'string'
    }
  })

  .command('despedir', 'Muestra una despedida', {
    nombre: {
      describe: 'Nombre de la persona de quien nos despedimos',
      demandOption: true,
      type: 'string'
    }
  })

  .command('sumar', 'Realiza una suma de dos números', {
    n1: {
      describe: 'Primer número de la suma',
      demandOption: true,
      type: 'number'
    },
    n2: {
        describe: 'Segundo número de la suma',
        demandOption: true,
        type: 'number'
      }
  })

  .command('leerArchivo', 'Lee un archivo JSON y muestra el contenido en la terminal', {
    archivo: {
      describe: 'Nombre del archivo JSON que se desea mostrar en terminal, debe estar en la misma carpeta de este proyecto',
      demandOption: true,
      type: 'string'
    }
  })

  .help()
  .argv;

  if (argv._.includes('saludar')) {
    if (argv.nombre) {
      console.log(`¡Hola, ${argv.nombre}!`);
    } else {
      console.error('Error: Debes incluir un nombre.');
    }
  }
  

if (argv._.includes('despedir')) {
    console.log(`¡Adiós, ${argv.nombre}!`);
  }

if (argv._.includes('sumar')) {
    console.log(`${argv.n1} + ${argv.n2} = ${argv.n1 + argv.n2}`);
}

if (argv._.includes('leerArchivo')) {
    const contenido = fs.readFileSync(argv.archivo, 'utf-8');
    const texto = JSON.parse(contenido);
    console.log('Contenido del archivo JSON: \n', texto);
}
  