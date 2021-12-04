const express= require('express')
const pm = require('../models/perfil_model')

const router = express.Router()

router.get('/',function(req,res,next){
    pm.obtener().then(perfiles => {
        res.render('perfiles/ver',{perfiles:perfiles,})

    }).catch(err => {
        return res.status(500).send('Error en obtener perfiles')
    })
});


router.get('/agregar',function(req,res,next){
    res.render('perfiles/agregar')
});



router.post('/insertar',  function(req,res,next){
    //Obtener nombre y precio y esto va del body

    const {nombre,apellido_pat,apellido_mat,edad,ubicacion,acercade} = req.body
    if(!nombre||!apellido_pat||!apellido_mat||!edad||!ubicacion||!acercade){
        return res.status(500).send('Algun valor se dejo en blanco')
    }
    pm.insertar(nombre,apellido_pat,apellido_mat,edad,ubicacion,acercade).then(resultado => {
        pm.obtener().then(perfiles => {
            req.flash('success','Se guardo correctamente!!')
            res.render('perfiles/ver',{perfiles:perfiles,})
        }).catch(err => {
         //Cambiar a mensaje flash enviado a un render
            return res.status(500).send('Error en obtener perfiles')
        })
    }).catch(err => {
        res.status(500).send('Error al borrar')
    })

});

router.get('/eliminar/:id',  function(req,res,next){
    //200 //500
    pm.eliminar(req.params.id).then(()=>{
        res.status(200).send('Borrado correcto')
    }).catch(err => {
        //Cambiar a mensaje flash enviado a un render
        res.status(500).send('Error al borrar')
    })
});


router.get('/:id',  function(req,res,next){
    pm.obtenerPorId(req.params.id).then(perfil =>{
        if(perfil){
            res.json(perfil)
        }else{
           res.status(404).send('No se encontro el perfil por id') 
        }

    }).catch(err =>{
        res.status(500).send('Error al obtener el perfil') 
    })
});

router.get('/editar/:id',function(req,res,next){
    pm.obtenerPorId(req.params.id).then(perfil =>{
        if(perfil){
            res.render('perfiles/editar',{perfil:perfil,})
        }else{
           res.status(404).send('No se encontro el perfil para editar') 
        }

    }).catch(err =>{
        res.status(500).send('Error al obtener el perfil') 

    })
});

router.post('/actualizar',  function(req,res,next){
   
   
     const {id,nombre,apellido_pat,apellido_mat,edad,ubicacion,acercade} = req.body
     if(!nombre||!apellido_pat||!apellido_mat||!edad||!ubicacion||!acercade){
         return res.status(500).send('No hay suficientes datos')
     }
     pm.actualizar(id,nombre,apellido_pat,apellido_mat,edad,ubicacion,acercade).then(()=>{
         return res.status(200).send('Actualizacion exitosa')
 
     }).catch(err=>{
         return res.status(500).send('No hay suficientes datos')
  
     })
 });

 module.exports= router

