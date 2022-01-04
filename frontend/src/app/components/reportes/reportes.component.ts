import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  opcion = ""
  registros: any[] = []

  // reporte 1
  nombre_equipo = ""

  // reporte 2
  membresia = ""

  // reprote 5
  pais_usuario = ""

  // reprote 6
  genero_usuario = ""

  // reporte 7 
  anios_usuario = ""

  // reporte 8
  noticias_consutla = ""

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  set_opcion(opcion:string) {
    this.opcion = opcion
    if (opcion == 'reporte3' || opcion == 'reporte4' || opcion == 'reporte10') {
      this.get_registros()
    }
  }

  get_registros() {
    if (this.opcion == 'reporte1') {
      let cuerpo_peticion = {
        reporte: this.opcion,
        dat1: this.nombre_equipo
      }
      this.http.post<any>('http://localhost:9000/reportes', cuerpo_peticion).subscribe(res => {
        this.registros = res.data;
      })
    } else if (this.opcion == 'reporte2') {
      let cuerpo_peticion = {
        reporte: this.opcion,
        dat1: this.membresia
      }
      this.http.post<any>('http://localhost:9000/reportes', cuerpo_peticion).subscribe(res => {
        this.registros = res.data;
      })
    } else if (this.opcion == 'reporte3' || this.opcion == 'reporte4' || this.opcion == 'reporte10')  {
      let cuerpo_peticion = {
        reporte: this.opcion,
      }
      this.http.post<any>('http://localhost:9000/reportes', cuerpo_peticion).subscribe(res => {
        this.registros = res.data;
      })
    } else if (this.opcion == 'reporte5') {
      let cuerpo_peticion = {
        reporte: this.opcion,
        dat1: this.pais_usuario
      }
      this.http.post<any>('http://localhost:9000/reportes', cuerpo_peticion).subscribe(res => {
        this.registros = res.data;
      })
    } else if (this.opcion == 'reporte6') {
      let cuerpo_peticion = {
        reporte: this.opcion,
        dat1: this.genero_usuario
      }
      this.http.post<any>('http://localhost:9000/reportes', cuerpo_peticion).subscribe(res => {
        this.registros = res.data;
      })
    } else if (this.opcion == 'reporte7') {
      let cuerpo_peticion = {
        reporte: this.opcion,
        dat1: this.anios_usuario
      }
      this.http.post<any>('http://localhost:9000/reportes', cuerpo_peticion).subscribe(res => {
        this.registros = res.data;
      })
    } else if (this.opcion == 'reporte8') {
      let cuerpo_peticion = {
        reporte: this.opcion,
        dat1: this.noticias_consutla
      }
      this.http.post<any>('http://localhost:9000/reportes', cuerpo_peticion).subscribe(res => {
        this.registros = res.data;
      })
    } else if (this.opcion == 'reporte9') {
      let cuerpo_peticion = {
        reporte: this.opcion,
        dat1: this.noticias_consutla,
        dat2: this.nombre_equipo
      }
      this.http.post<any>('http://localhost:9000/reportes', cuerpo_peticion).subscribe(res => {
        this.registros = res.data;
      })
    }
  }



 
}
