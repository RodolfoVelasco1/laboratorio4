const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { config } = require ('dotenv')
config()

const usuarioRoutes = require('./routes/usuarios.routes')

const app = express();
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err))
const db = mongoose.connection;

app.use('/usuarios', usuarioRoutes)


const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
    
})