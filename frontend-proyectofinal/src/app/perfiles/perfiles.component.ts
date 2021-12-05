import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from '../perfil';
import { PerfilesService } from '../perfiles.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})

export class PerfilesComponent implements OnInit {
  public perfiles = [];
  public columnas = ['nombre','apellido_pat','apellido_mat','edad','ubicacion','acercade'];
  
  constructor(private router: Router,private perfilesService: PerfilesService) { 

  }

  async eliminar(perfil:Perfil){
    if (!confirm("¿Realmente lo quieres eliminar?")) {
      return;
    }
    await this.perfilesService.eliminarPerfil(perfil.id_perfil);
    await this;
  }


  async obtenerPerfiles() {
    this.perfiles = await this.perfilesService.obtenerperfiles();
  }

  async ngOnInit() {
    await this.obtenerPerfiles();
  }

  navegarAFormulario() {
    this.router.navigateByUrl("/perfiles/agregar");
  }
}
