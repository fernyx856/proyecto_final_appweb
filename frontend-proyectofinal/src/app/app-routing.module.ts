import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { TarjetaPerfilComponent } from './tarjeta-perfil/tarjeta-perfil.component';
import { TodosperfilesComponent } from './todosperfiles/todosperfiles.component';


const routes: Routes = [
  {path: 'perfiles',component: PerfilesComponent},
  {path: 'tarjeta-perfil',component: TarjetaPerfilComponent},
  {path: 'todosperfiles',component: TodosperfilesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
