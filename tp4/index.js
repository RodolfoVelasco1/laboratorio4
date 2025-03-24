//Ejercicio 1
import dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

console.log(`DB_HOST: ${dbHost}`);
console.log(`DB_USER: ${dbUser}`);
console.log(`DB_PASS: ${dbPass}`);

//Ejercicio 2
import { sumar } from './math.js';

const resultado = sumar(5, 3);
console.log(`5 + 3 = ${resultado}`);

//Ejercicio 3 y 4
import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('¿Cuál es tu nombre? ', (nombre) => {
 console.log(`Hola, ${nombre}!`);


    rl.question('¿Cuántos años tienes? ', (edad) => {
        const anioNacimiento = new Date().getFullYear() - parseInt(edad);
        console.log(`Tienes ${edad} años. Naciste en el año ${anioNacimiento}`);


        rl.question('¿Cuál es tu correo electrónico? ', (correo) => {
            console.log(`Tu correo electrónico es: ${correo}`);

            rl.close();

            fs.writeFileSync("datos_usuario.txt", `DATOS DEL USUARIO:\n- Nombre: ${nombre}.\n- Edad: ${edad} años.\n- Correo Electrónico: ${correo}`, "utf-8")
            const archivo = fs.readFileSync("datos_usuario.txt", "utf-8")
            console.log(archivo);
        });
    });
});


