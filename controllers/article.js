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


    },

    getArticles: (req, res)=>{
        
        var query =  Article.find({});

        var last = req.params.last;     
        
        if(last || last != undefined){
            query.limit(5);
        }

        //Find
       query.sort('-_id').exec((err, articles)=>{
            
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos.'
                });
            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar.'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });

    },

    getArticle: (req, res )=>{

        // Recoger el id de la url
        var articleId = req.params.id;

        // comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'El artículo no existe.'
            });
        }

        // buscar el articulo
        Article.findById(articleId, (err, article)=>{
            

            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo.'
                });
            }

            // devolver en json
            return res.status(200).send({
                status: 'success',
                article
            });


      
        });
        
    }


};  // en controller

module.exports = controller;