import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tarjeta-perfil',
  templateUrl: './tarjeta-perfil.component.html',
  styleUrls: ['./tarjeta-perfil.component.css']
})
export class TarjetaPerfilComponent implements OnInit {

  @Input() perfil:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public resolverRuta(){
    const baseUrl = environment.imagenUrl;
    return `${baseUrl}foto_perfil/${this.perfil.foto}`;
  }

  public detalles(){
    this.router.navigate(["/perfil/acercade",this.perfil.id_perfil]);
  }

}
