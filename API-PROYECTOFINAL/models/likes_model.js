const conexion = require("../config/conexion");
const { obtener } = require("./perfil_model");
module.exports = {

    actualizar(likes,dislikes,id_perfil){
        return new promise((resolve,reject)=>{

            conexion.query('UPDATE tabla_likes SET likes=?, dislikes=? WHERE id_perfil=?',[likes,dislikes,id_perfil],
            (err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
        })
    },

    obtener(){
        return new Promise((resolve,reject) => {
            
            conexion.query('select * from fotos_perfiles', (err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
    
        })
        },


    obtenerporid(idperfil){
        return new Promise((resolve,reject) => {
                
            conexion.query('select * from fotos_perfiles WHERE id_perfil =?',[idperfil], (err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
        
        })
    },


}