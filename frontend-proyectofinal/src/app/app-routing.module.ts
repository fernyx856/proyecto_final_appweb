import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { TarjetaPerfilComponent } from './tarjeta-perfil/tarjeta-perfil.component';
import { TodosperfilesComponent } from './todosperfiles/todosperfiles.component';
import { AgregarPerfilesComponent } from './agregar-perfiles/agregar-perfiles.component';
import { DetallePerfilComponent } from './detalle-perfil/detalle-perfil.component';
import { EditarPerfilesComponent } from './editar-perfiles/editar-perfiles.component';


const routes: Routes = [
  {path: 'perfiles',component: PerfilesComponent},
  {path: 'tarjeta-perfil',component: TarjetaPerfilComponent},
  {path: 'todosperfiles',component: TodosperfilesComponent},
  {path: 'perfiles/agregar',component: AgregarPerfilesComponent},
  {path: 'perfil/:id', component: DetallePerfilComponent},
  {path:  'perfil/editar/:id',component: EditarPerfilesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
