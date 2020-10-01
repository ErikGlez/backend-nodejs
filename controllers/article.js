'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

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

    getArticles: (req, res) => {

        var query = Article.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }

        //Find
        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos.'
                });
            }

            if (!articles) {
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

    getArticle: (req, res) => {

        // Recoger el id de la url
        var articleId = req.params.id;

        // comprobar que existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'El artículo no existe.'
            });
        }

        // buscar el articulo
        Article.findById(articleId, (err, article) => {


            if (err || !article) {
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

    },

    update: (req, res) => {

        // Recorger el id del articulo por la url
        var articleId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar los datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            // Find and update
            Article.findByIdAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    // Devolver respuesta
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if (!articleUpdated) {
                    // Devolver respuesta
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }

                // Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });


            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos.'
            });
        }

    },

    delete: (req, res)=>{

        //Recoger el id de la url
        var articleId = req.params.id;

        // find and delete
        Article.findOneAndDelete({_id: articleId},(err, articleRemoved)=>{

            if(err || !articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'Error al eliminar el artículo.'
                });
            }
            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
            
        });
       
    },

    upload: (req , res) =>{
        
        // Configurar el modulo connect multiparty router/article.js

        // recoger el fichero de la peticion
        var file_name = 'Imagen no subida';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
       
        //conseguir el nombre y la extrension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // nombre del archivo
        var file_name = file_split[2];

        // extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        //comprobar la extension, solo imagenes, si no es valida borrar

        if( file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif' ){
            //borrar el archivo subido
            fs.unlink(file_path, (err)=>{
                return res.status(500).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es valida.'
                });
            });
        }else{
            // si es valido
            var articleId = req.params.id;
            // buscar el articulo y asignarle el nombre del archivo y subirlo
            Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new:true}, (err, articleUpdated)=>{

                if(err || !articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error al guardar la imagen del articulo.'
                    });

                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });

            });

            
        }

        


        
    }


};  // en controller

module.exports = controller;