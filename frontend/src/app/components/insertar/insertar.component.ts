import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.css']
})
export class InsertarComponent implements OnInit {

  opcion = ""

  equipo = {
    nombre: "",
    pais: "",
    fecha_fun: "",
    foto_logo: "",
  }

  estadio = {
    pais: "",
    nombre: "",
    fecha_ing: "",
    capacidad: "",
    direccion: "",
    estado: "",
    foto: "",
  }

  director = {
    nombre: "",
    fecha_nac: "",
    pais: "",
    nacionalidad: "",
    estado: "",
    foto: "",
    idEquipo: "",
    pais_equipo: "",
    fecha_ini: "",
    fecha_fin: "",
  }

  jugador = {
    nombre: "",
    fecha_nac: "",
    nacionalidad: "",
    posicion: "",
    pais_equipo: "",
    equipo: "",
    fecha_ini: "",
    fecha_fin: "",
  }

  competicion = {
    nombre: "",
    anio: "",
    tipo: "",
    campeon: "",
    pais: "",
    pais_equipo: "",
    equipo: "",
  }


  partido = {
    fecha: "",
    Estadio: "",
    estado: "",
    asistencia: "",
    pais_local: "",
    equipo_local: "",
    pais_visita: "",
    equipo_visita: "",
    resultado: "",
    incidencia: "",
    minuto: "",
    equipo_incidencia: "",
    jugador: "",
  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  set_opcion_tabla(opcion: string) {
    this.opcion = opcion
  }

  insertar_registro() {
    let se_inserto = false
    if (this.opcion === "equipo") {
      this.http.post<any>('http://localhost:9000/insertEquipo', this.equipo).subscribe(res => {
        se_inserto = res.estado
      })
    } else if  (this.opcion === "estadio") {
      this.http.post<any>('http://localhost:9000/insertEstadio', this.estadio).subscribe(res => {
        se_inserto = res.estado
      })
    } else if (this.opcion == "director") {
      this.http.post<any>('http://localhost:9000/insertDirector_tecnico', this.director).subscribe(res => {
        se_inserto = res.estado
      })
    } else if (this.opcion == 'jugador') {
      this.http.post<any>('http://localhost:9000/insertHistorialjuador', this.jugador).subscribe(res => {
        se_inserto = res.estado
      })
    } else if (this.opcion == 'competicion') {
      this.http.post<any>('http://localhost:9000/insertParticipa_competencia', this.competicion).subscribe(res => {
        se_inserto = res.estado
      })
    } else if (this.opcion == 'partido') {
      this.http.post<any>('http://localhost:9000/insertPartido_inscidensia', this.partido).subscribe(res => {
        se_inserto = res.estado
      })
    }
 
    if (se_inserto) {
      alert("Se pudo insertar reigtro.")
    } else {
      alert("No se pudo insertar reigtro.")
    }
  }

  

}
