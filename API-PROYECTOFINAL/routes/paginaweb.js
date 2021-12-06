const express=require('express')
const app = express.Router()
const perfilModel = require("../models/perfil_model")
const likesModel = require("../models/likes_model")
const formidable = require("formidable")
const path = require("path")
fs = require("fs")
const {v4: uuidv4} = require("uuid")
DIRECTORIO_FOTOS = path.join("C:\\Users\\ferna\\Documents\\GitHub\\proyecto_final_appweb\\API-PROYECTOFINAL\\fotos_perfiles");

app.delete("/perfiles", async (req, res) => {

    if (!req.query.id) {
      res.end("Not found");
      return;
    }
    const idperfil = req.query.id;
    await perfilModel.eliminar(idperfil);
    res.json(true);
  });



  app.get("/likes", async (req, res) => {
    const ventas = await likesModel.obtener();
    res.json(ventas);
  });



  app.post('/fotos_perfil', (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: DIRECTORIO_FOTOS,
    });

  
    form.parse(req, async (err, fields, files) => {
      console.log(req);
      const idPerfil = fields.id_perfil;
      console.log(idPerfil)
      console.log(fields)
      console.log(files)
      for (let clave in files) {
        const file = files[clave];
        const nombreArchivo = file.name;
        await perfilModel.agregarFoto(idPerfil, nombreArchivo)
      }
    });
  
    form.on("fileBegin", (name, file) => {
      const extension = path.extname(file.name);
      const nuevoNombre = uuidv4().concat(extension);
      file.path = path.join(DIRECTORIO_FOTOS, nuevoNombre);
      file.name = nuevoNombre;
    })
  
    form.on("end", () => {
      res.json({
        respuesta: true,
      })
    })
  
  });


  app.post('/perfil', async (req, res) => {
    const perfil = req.body;
    const respuesta = await perfilModel.insertar(perfil.nombre, perfil.apellido_pat,perfil.apellido_mat,perfil.edad,perfil.ubicacion,perfil.acercade);
    res.json(respuesta);
  });
  
  app.get('/perfiles', async (req, res) => {
    const perfiles = await perfilModel.obtener();
    res.json(perfiles);
  });

  app.get('/perfiles_con_fotos', async (req, res) => {
    const perfiles = await perfilModel.obtenerConFotos();
    res.json(perfiles);
  });

  app.get('/perfil', async (req, res) => {
    if (!req.query.id) {
      res.end("not found");
      return;
    }
    const perfil = await perfilModel.obtenerPorId(req.query.id);
    perfil.fotos = await perfilModel.obtenerFotos(req.query.id);
    res.json(perfil);
  });

  module.exports= app