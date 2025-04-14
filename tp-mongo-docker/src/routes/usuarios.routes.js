const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuarios.model')

//Obtener todos los usuarios [GET ALL]
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        console.log('GET ALL', usuarios);
        if(usuarios.length === 0){
            return res.status(204).json([])
        }
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//Crear un nuevo usuario [POST]
router.post('/', async (req, res) => {
    const {nombre, edad, email } = req?.body
    if(!nombre || !edad || !email){
        return res.status(400).json({
            message: 'Los campos nombre, edad y email son obligatorios'
        })
    }

    const usuario = new Usuario(
        {
            nombre,
            edad,
            email
        }
    )
    try {
      const nuevoUsuario = await usuario.save()
      console.log(nuevoUsuario)
      
      res.status(201).json(nuevoUsuario)
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  });

  module.exports = router
  