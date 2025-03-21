const { crearArchivo, agregarContacto, mostarContactos, eliminarContacto } = require("./funciones");

const contactos = [{
    nombre: "Juan Pérez",
    telefono: "123-456-7890",
    email: "juan@example.com"
}]

crearArchivo("contactos.json", JSON.stringify(contactos));
mostarContactos();
agregarContacto('Pepe Argento', '789-456-123', 'pepeargento@hotmail.com');
mostarContactos();
eliminarContacto('Juan Pérez');
mostarContactos();

