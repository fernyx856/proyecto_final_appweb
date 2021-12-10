import { Component, ElementRef,OnInit,ViewChild } from '@angular/core';
import { Perfil } from '../perfil';
import { PerfilesService } from '../perfiles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fotoperfil } from '../foto';

@Component({
  selector: 'app-agregar-perfiles',
  templateUrl: './agregar-perfiles.component.html',
  styleUrls: ['./agregar-perfiles.component.css']
})

export class AgregarPerfilesComponent implements OnInit {

  perfilModel = new Perfil("","","",0,"","",0);
  fotografia = new fotoperfil("",0);

  @ViewChild("foto",{
    read: ElementRef
  }) foto : ElementRef | undefined;


  constructor(private perfilService: PerfilesService,private snackbar: MatSnackBar) { }

  public cargando = false;

  ngOnInit(): void {
  }

  async guardar(){
    if(!this.perfilModel.nombre){
      return alert("Escribe un nombre");
    }
    if(!this.perfilModel.apellido_pat){
      return alert("Escribe el apellido paterno");
    }
    if(!this.perfilModel.apellido_mat){
      return alert("Escribe el apellido materno");
    }
    if(!this.perfilModel.edad){
      return alert("Escribe la edad");
    }
    if(!this.perfilModel.ubicacion){
      return alert("Escribe la ubicacion");
    }
    if(!this.perfilModel.acercade){
      return alert("Escribe un poco sobre la persona");
    }
    let archivos = this.foto!.nativeElement.files;
    if (!archivos.length) {
      return alert("Selecciona al menos una foto");
    }

    this.cargando = true;
    const idperfilguardado = await this.perfilService.agregarPerfil(this.perfilModel);
    
    this.fotografia.foto = archivos[0].name;
    this.fotografia.id_perfil = idperfilguardado;
    const fd = new FormData();

    for (let x = 0; x < archivos.length; x++) {
       console.log(archivos[x]);
       fd.append(`foto_${x}`,archivos[x])
     }
     fd.append("id_perfil", idperfilguardado);
    const respuesta = await this.perfilService.agregarFotosDePerfil(fd);
    // const respuesta = this.perfilService.agregarfotodeperfil(this.fotografia);

    this.snackbar.open("Perfil guardado", "", {
      duration: 1500,
      horizontalPosition: "start",
      verticalPosition: "top",
    });

    this.cargando = false;
    this.perfilModel = new Perfil("","","",0,"","",0);
    this.foto!.nativeElement.value = "";
  }

}
