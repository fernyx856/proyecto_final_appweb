const conexion = require("../config/conexion");
module.exports = {

    actualizar(likes,dislikes,id_perfil){
        return new promise((resolve,reject)=>{

            conexion.query('UPDATE tabla_likes SET likes=?, dislikes=? WHERE id_perfil=?',[likes,dislikes,id_perfil],
            (err,resultados)=>{
                if(err)reject(err)
                else resolve(resultados)
            })
        })
    }
}