'use strict'

// Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');

// ejecutar express para poder trabajar con http
var app = express();

// cargar ficheros rutas
var article_routes = require('./routes/article');

// cargar Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// cargar el CORS (permitir peticiones desde el front end)

// añadir prefijos a rutas / cargar rutas
app.use('/api',article_routes);

// exportar el modulo (fichero actual) para poderlo usar fuera.

module.exports = app;