import { Component, OnInit } from '@angular/core';
import { Perfil } from '../perfil';
import { environment } from 'src/environments/environment';
import { PerfilesService } from '../perfiles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-perfiles',
  templateUrl: './editar-perfiles.component.html',
  styleUrls: ['./editar-perfiles.component.css']
})
export class EditarPerfilesComponent implements OnInit {

  public perfilModel : any = {
    id_perfil: 0,
    fotos :[],
    nombre: "",
    apellido_pat:"",
    apellido_mat:"",
    edad: 0,
    acercade: "",
  }


  public fotoseleccionada:string="";
  public indiceSeleccionado=0;
  public existe!:Boolean;
  
  constructor(private perfilservice:PerfilesService , public activatedroute: ActivatedRoute) { }

  public cargando = false;


  async ngOnInit(){
    const id = this.activatedroute.snapshot.paramMap.get("id");
    this.perfilModel = await this.perfilservice.obtenerPerfilesConFotosPorId(id!);
    if(this.perfilModel.fotos.length>=0){
      this.seleccionarImagen(0);
    }
  }

  public resolverFoto(foto:string){
    const baseUrl=environment.imagenUrl;
    return `${baseUrl}foto_perfil/${foto}`;
  }

  public seleccionarImagen(indice:number){
    this.indiceSeleccionado=indice;
    // Agregar variable de foto
    this.fotoseleccionada = this.perfilModel.fotos[this.indiceSeleccionado].foto;
  }

  
  async editar(perfil : Perfil){
    this.cargando = true;
    if (!confirm("¿Realmente lo quieres editar?")) {
      return;
    }
   console.log("Si entre a modificar a "+ perfil.id_perfil)
   this.perfilservice.actualizarPerfil(perfil);
   this.cargando = false;
  }



}
