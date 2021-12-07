import { Injectable } from '@angular/core';
import { Perfil } from './perfil';
import { likes } from './likes';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class PerfilesService {

  constructor(private http:HttpService) { }

  public async obtenerperfiles(){
    return await this.http.get("/perfiles");
  }

  public async eliminarPerfil(id_perfil:number){
    console.log(id_perfil);
    return await this.http.delete("/perfil?id=".concat(id_perfil.toString()))
  }

  public async agregarPerfil(perfil:Perfil){
    return await this.http.post("/perfil",perfil)
  }
  

  public async agregarFotosDePerfil(fotos:FormData){
    console.log(fotos.get("foto_0"));
    return await this.http.formdata("/fotos_perfil",fotos);
  }

  public async obtenerPerfilesConFotos(){
    return await this.http.get("/perfiles_con_fotos");
  }

  public async obtenerPerfilConLikeyfotoporid(id_perfil:string){
    return await this.http.get("/likes?id=".concat(id_perfil));
  }

  public async obtenerPerfilesConFotosPorId(id_perfil:string){
    return await this.http.get("/perfil?id=".concat(id_perfil));
  }

  public async actualizarPerfil(perfil : Perfil){
    console.log("Si recibi en el servicio para modiciar a "+ perfil.id_perfil)
    return await this.http.post("/perfileditar",perfil);
  }

  public async actualizarLikes(like : likes){
    console.log("Si recibi en el servicio para modiciar a "+ like.id_perfil)
    return await this.http.post("/editarlikes",like);
  }

  

 
}
