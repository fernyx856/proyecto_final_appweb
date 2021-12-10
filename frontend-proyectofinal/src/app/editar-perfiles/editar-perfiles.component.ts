import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Perfil } from '../perfil';
import { fotoperfil } from '../foto';
import { environment } from 'src/environments/environment';
import { PerfilesService } from '../perfiles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-perfiles',
  templateUrl: './editar-perfiles.component.html',
  styleUrls: ['./editar-perfiles.component.css']
})
export class EditarPerfilesComponent implements OnInit {

  @ViewChild("foto",{
    read: ElementRef
  }) foto : ElementRef | undefined;

  fotografia = new fotoperfil("",0); 
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
    console.log(this.perfilModel.fotos[0].foto);
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
   this.perfilservice.actualizarPerfil(perfil);
   let archivos = this.foto!.nativeElement.files;
    if (!archivos.length) {
      
    } else {
    
    const fd = new FormData();
    for (let x = 0; x < archivos.length; x++) {
      console.log(archivos[x]);
      fd.append(`foto_${x}`,archivos[x])
    }
    fd.append("id_perfil", this.perfilModel.id_perfil);
   const respuesta = await this.perfilservice.actualizarimagen(fd);
  }



   this.cargando = false;
  }



}
