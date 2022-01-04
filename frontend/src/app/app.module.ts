import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginService } from './services/login.service';
import { RegistroComponent } from './components/registro/registro.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { InsertarComponent } from './components/insertar/insertar.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { FondoComponent } from './components/fondo/fondo.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavBarComponent,
    InicioComponent,
    ModificarComponent,
    EliminarComponent,
    InsertarComponent,
    BuscarComponent,
    FondoComponent,
    ReportesComponent,
    NoticiasComponent,
    ResultadosComponent,
    EstadisticasComponent,
    AgregarUsuarioComponent,
    MembresiaComponent,
    PerfilComponent,
    BienvenidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ 
    LoginService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
