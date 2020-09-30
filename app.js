'use strict'

// Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');

// ejecutar express para poder trabajar con http
var app = express();

// cargar ficheros rutas


// cargar Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// cargar el CORS (permitir peticiones desde el front end)

// añadir prefijos a rutas

// ruta o metodo de prueba para el API REST

app.get('/datos-curso', (req, res)=>{
    return res.status(200).send({
        curso: 'Master en Frameworks JS',
        alumno: 'Erik Gonzalez',
        url: 'instagram.com/eriezly'
    });
});

// exportar el modulo (fichero actual) para poderlo usar fuera.

module.exports = app;