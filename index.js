'use strict'

// Cargar el modulo de mongoose
var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

// Conexion a MongoDB

// forzar a que los metodos antiguos se desactiven, para solo usar metodos nuevos que si aparecen en la documentación
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

//................url, opciones
mongoose.connect('mongodb://localhost:27017/api-rest-blog', {useNewUrlParser: true}).then(()=>{
    console.log('>> Conexión a la BD establecida con exito <<')

    // Crear servidor y escuchar peticiones HTTP
    app.listen(port, ()=>{
        console.log('Servidor corriendo en http://localhost:'+port);
    });

});