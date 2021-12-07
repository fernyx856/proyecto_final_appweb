import { Component, OnInit } from '@angular/core';
import { PerfilesService } from '../perfiles.service';
import { ActivatedRoute } from '@angular/router';
import { Perfil } from '../perfil';
import { likes } from '../likes';
import { environment } from 'src/environments/environment';
import { Action } from 'rxjs/internal/scheduler/Action';


@Component({
  selector: 'app-detalle-perfil',
  templateUrl: './detalle-perfil.component.html',
  styleUrls: ['./detalle-perfil.component.css']
})
export class DetallePerfilComponent implements OnInit {

  public perfil : any = {
    id_perfil: 0,
    fotos :[],
    nombre: "",
    apellido_pat:"",
    apellido_mat:"",
    edad: 0,
    acercade: "",
    likes:0,
    dislikes:0,
  }

  public like: any={
    likes:0,
    dislikes:0,
    id_perfil:0,
  }


  public fotoseleccionada:string="";
  public indiceSeleccionado=0;
  public existe!:Boolean;

  constructor(private perfilservice:PerfilesService , public activatedroute: ActivatedRoute) { }

  async ngOnInit(){
    const id = this.activatedroute.snapshot.paramMap.get("id");
    this.perfil = await this.perfilservice.obtenerPerfilConLikeyfotoporid(id!);
    this.like = this.perfil.likes[0];
    if(this.perfil.fotos.length>=0){
      this.seleccionarImagen(0);
    }
    this.refreshState();
  }

  public resolverFoto(foto:string){
    const baseUrl=environment.imagenUrl;
    return `${baseUrl}foto_perfil/${foto}`;
  }

  public seleccionarImagen(indice:number){
    this.indiceSeleccionado=indice;
    // Agregar variable de foto
    this.fotoseleccionada = this.perfil.fotos[this.indiceSeleccionado].foto;
  }

  async refreshState(){
    const id=this.perfil.id_perfil;
  }

  public editarlikes(like: likes){
  console.log("Si entre a modificar a "+ like.id_perfil)
  like.likes = like.likes +1;
   this.perfilservice.actualizarLikes(like);
  }

  public editardislikes(like: likes){
    console.log("Si entre a modificar a "+ like.id_perfil)
    like.dislikes = like.dislikes +1;
     this.perfilservice.actualizarLikes(like);
    }

}
