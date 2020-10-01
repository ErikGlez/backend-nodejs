'use strict'

var validator = require('validator');
var Article = require('../models/article');
const { param } = require('../routes/article');

var controller = {
    datosCurso: (req, res) => {

        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            alumno: 'Erik Gonzalez',
            url: 'instagram.com/eriezly',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la accion test del controlador de articulos'
        });
    },

    save: (req, res) => {
        // Recorger los parametros por post
        var params = req.body;

        // validar datos (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar.'
            });
        }

        if (validate_title && validate_content) {
            // crear el objeto a guardar
            var article = new Article();
            // asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            // guardar articulo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado.'
                    });
                }

                // devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    articleStored
                });

            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos.'
            });
        }


    }



};  // en controller

module.exports = controller;