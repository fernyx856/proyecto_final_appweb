import { Component } from '@angular/core';
import { Perfil } from './perfil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public perfiles:Perfil[]=[];
  title = 'Proyecto final';
}


