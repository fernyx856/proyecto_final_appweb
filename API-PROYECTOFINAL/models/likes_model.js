const conexion = require("../config/conexion");
const { obtener } = require("./perfil_model");
module.exports = {


    agregarlikes(id_perfil){
        return new Promise((resolve,reject)=>{
            conexion.query('INSERT INTO tabla_likes (id_perfil,likes,dislikes) VALUES (?,0, 0);',[id_perfil], (err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
        })
    },

    actualizar(likes,dislikes,id_perfil){

        return new Promise((resolve,reject)=>{
            conexion.query('UPDATE tabla_likes SET likes=?, dislikes=? WHERE id_perfil=?',[likes,dislikes,id_perfil], (err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
        })
    },

    obtenerlikes(id){
        return new Promise((resolve,reject) => {
            conexion.query('select * from tabla_likes Where id_perfil = ?',[id], (err,resultados)=>{
                console.log(resultados);
                if(err)reject(err);
                else resolve(resultados)
            })
        })
        },




}