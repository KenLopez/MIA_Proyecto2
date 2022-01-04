import { NgModule } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { FondoComponent } from './components/fondo/fondo.component';
import { InsertarComponent } from './components/insertar/insertar.component';
import { LoginComponent } from './components/login/login.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ResultadosComponent } from './components/resultados/resultados.component';

const routes: Routes = [
  {
    path: '',
    component: BienvenidaComponent,
  }, 

  {
    path: 'login',
    component: LoginComponent
  },
   
  {
    path: 'registro',
    component: RegistroComponent
  },

  {
    path: 'inicio',
    component: NavBarComponent,
    children: [
      { path: '', component: FondoComponent},
      { path: 'modificar', component: ModificarComponent},
      { path: 'insertar', component: InsertarComponent},
      { path: 'eliminar', component: EliminarComponent},
      { path: 'buscar', component: BuscarComponent},
      { path: 'reportes', component: ReportesComponent},
      { path: 'resultados', component: ResultadosComponent},
      { path: 'noticias', component: NoticiasComponent},
      { path: 'estadisticos', component: EstadisticasComponent},
      { path: 'nuevoUsuario', component: AgregarUsuarioComponent},
      {path: 'perfil', component: PerfilComponent}

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
