import { Component, OnInit } from '@angular/core';
import { PerfilesService } from '../perfiles.service';

@Component({
  selector: 'app-todosperfiles',
  templateUrl: './todosperfiles.component.html',
  styleUrls: ['./todosperfiles.component.css']
})
export class TodosperfilesComponent implements OnInit {

  public perfiles=[];

  constructor(private perfilesService : PerfilesService) { }

  async ngOnInit(){
    this.perfiles = await this.perfilesService.obtenerPerfilesConFotos()
  }

}
