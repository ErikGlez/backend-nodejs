'use strict'

var controller = {
    datosCurso: (req, res)=>{

        var hola = req.body.hola;
    
        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            alumno: 'Erik Gonzalez',
            url: 'instagram.com/eriezly',
            hola
        });
    },

    test: (req, res)=>{
        return res.status(200).send({
            message: 'Soy la accion test del controlador de articulos'
        });
    }

};  // en controller

module.exports = controller;