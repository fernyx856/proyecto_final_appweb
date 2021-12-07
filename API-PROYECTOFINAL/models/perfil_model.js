const conexion = require("../config/conexion");
const fs = require('fs');
const path = require('path');
const { resolve } = require("path");

module.exports = {

    insertar(nombre,apellido_mat,apellido_pat,edad,ubicacion,acercade){

        return new Promise((resolve,reject) => {
            console.log("Aqui recibi los valores de "+nombre);
            conexion.query('insert into perfil (nombre,apellido_pat,apellido_mat,edad,ubicacion,acercade)'+
           ' values (?,?,?,?,?,?)',[nombre,apellido_mat,apellido_pat,edad,ubicacion,acercade],(err,resultado) => {
               if (err)reject(err);
               else resolve(resultado.insertId)
           })
        })
    
    
    },

    actualizar(id,nombre,apellido_pat,apellido_mat,edad,ubicacion,acercade){
    
        return new Promise((resolve,reject)=>{
            console.log("Entre a modificar a "+nombre);
            conexion.query('update perfil set nombre =?,apellido_pat = ?,apellido_mat=?,edad=?,'+
            'ubicacion=?,acercade=? where id_perfil=?',[nombre,apellido_pat,apellido_mat,edad,ubicacion,acercade,id], (err,resultado)=>{
                if(err)reject(err);
                else resolve(resultado.insertId);
            })
        })
    },


    obtener(){

        return new Promise((resolve,reject)=>{

            conexion.query('select id_perfil,nombre,apellido_pat,apellido_mat,edad,ubicacion'+
            ',acercade from perfil',(err,resultados)=>{
    
                if(err)reject(err);
                else resolve(resultados);
            })
    
        })
    },

    
    
    eliminar(id){
        return new Promise(async (resolve,reject)=>{
            //const fotos=await this.obtenerFotos(id)
            //for(let i=0;i<fotos.length;i++){
              //await fs.unlinkSync(path.join(__dirname,"fotos_productos",fotos[i].foto))
            //}
    
            conexion.query('delete from fotos_perfiles where id_perfil =?',[id],
            (err)=>{
                if(err)reject(err);
                else resolve();
            })
    
            conexion.query('delete from perfil where id_perfil =?',[id],
            (err)=>{
                if(err)reject(err);
                else resolve();
            })
        })
    },

    agregarFoto(id_perfil,nombreFoto){

        return new Promise((resolve,reject)=>{
            conexion.query('insert into fotos_perfiles (id_perfil,foto) '+
            'values  (?,?)',[id_perfil,nombreFoto],(err,resultados)=>{
                if(err)reject(err);
                else resolve(resultados.insertId);
            })
        })
    },

    agregarlikes(id_perfil){

        return new Promise((resolve,reject)=>{
    
            conexion.query('INSERT INTO tabla_likes (id_perfil,likes,dislikes)'+
            'values  (?,0,0)',[id_perfil],(err,resultados)=>{
                if(err)reject(err);
                else resolve(resultados.insertId);
            })
        })
    },


    obtenerFotos(id_perfil){
        return new Promise((resolve, reject) => {
            conexion.query('select id_perfil, foto FROM fotos_perfiles '+
             'WHERE id_perfil = ?',[id_perfil],
             (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
              })
        })
    },

    obtenerPorId(id){
        return new Promise((resolve, reject) => {
    
            conexion.query('select id_perfil,nombre,apellido_pat,apellido_mat,edad,ubicacion'+
            ',acercade from perfil where id_perfil = ?',[id],
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados[0]);
              })
        })
    },

    obtenerPrimerFoto(id_perfil){
        return new Promise((resolve, reject) => {
            conexion.query('select foto from fotos_perfiles'
            +' WHERE id_perfil = ? limit 1',
            [id_perfil],
            (err, resultados) => {
              if (err) reject(err);
              else {
               if( resultados.length>0){
                resolve(resultados[0].foto);
            }else{
                resolve('nodisp.jpg');
            }
            }
            });
        })
    },

    obtenerConFotos(){

        return new Promise((resolve,reject) => {
    
            conexion.query('select *  from perfil',
            async(err,resultados) =>{
    
                if(err)reject(err)
                else {
                    for(let x=0;x<resultados.length;x++){
                        fotoAux=await this.obtenerPrimerFoto(resultados[x].id_perfil)
                    
                        if(fotoAux){
                            resultados[x].foto= fotoAux
                        }else{
                            resultados[x].foto= 'nodisp.png'
                        }
                       
                    }
                    resolve(resultados)
                }
            }
            )
        })
    }
    

}