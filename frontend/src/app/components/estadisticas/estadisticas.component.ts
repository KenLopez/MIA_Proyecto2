import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  opcion  = "None"
  registros: any[] = []

  // consulta 1
  entidad = "desconocido"
  nombre_equipo = ""

  // consulta 2
  anios_entidad = ""

  // consulta 3
  nombre_competicion = ""

  // consulta 4
  nombre_pais = ""


  // consulta 6
  anios_antiguedad = ""

  // consulta 7
  pais_estadio = ""

  // consulta 8
  capacidad_estadio = ""

  // consulta 11
  canitdad_goles = ""

  // consulta 11
  incidencia = ""

  // consulta 13
  anio_incidencias = ""

  // consulta 15
  anio_partidos = ""

  // consulta 16
  equipo1 = ""
  equipo2 = ""

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  set_opcion_consulta(opcion: string) {
    this.opcion = opcion
  }

  set_jugador() {
    this.entidad = "jugador";
  }

  set_director() {
    this.entidad = "director";
  }

  consultar() {
    if (this.opcion == "consulta1") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.entidad, 
        dat2: this.nombre_equipo
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta2" || this.opcion == "consulta3") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.entidad, 
        dat2: this.anios_entidad
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta4") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.nombre_competicion
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta5") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.nombre_pais
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta6") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.anios_antiguedad
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta7") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.pais_estadio
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta8") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.capacidad_estadio
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta9") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.nombre_equipo
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta10") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.entidad,
        dat2: this.nombre_equipo
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta11") {
      let peticion_body = {
        consulta: this.opcion, 
        dat1: this.canitdad_goles
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta12") {
      let peticion_body = {
        consulta: this.opcion,
        dat1: this.incidencia
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta13") {
      let peticion_body = {
        consulta: this.opcion,
        dat1: this.incidencia,
        dat2: this.anio_incidencias,
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta14") {
      let peticion_body = {
        consulta: this.opcion,
        dat1: this.nombre_equipo,
        dat2: this.nombre_competicion,
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta15") {
      let peticion_body = {
        consulta: this.opcion,
        dat1: this.anio_partidos
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta16") {
      let peticion_body = {
        consulta: this.opcion,
        dat1: this.equipo1,
        dat2: this.equipo2
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    } else if (this.opcion == "consulta17") {
      let peticion_body = {
        consulta: this.opcion,
        dat1: this.equipo1
      }
      this.http.post<any>('http://localhost:9000/Dat_Est', peticion_body).subscribe(res => {
        this.registros = res.data
      })
    }
 
  } 

}
