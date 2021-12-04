import { Injectable } from '@angular/core';
import { Perfil } from './perfil';
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
    return await this.http.formdata("/fotos_perfiles",fotos);
  }

  public async obtenerPerfilesConFotos(){
    return await this.http.get("/perfiles_con_fotos");
  }

  public async obtenerPerfilesConFotosPorId(id_perfil:string){
    return await this.http.get("/perfil?id=".concat(id_perfil));
  }

 
}
