import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  opcion = ""
  registros: any[] = []
  pagina_actual = 0
  indice_inicio = 0

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  set_opcion_tabla(opcion: string) {
    this.opcion = opcion
    this.http.post<any>('http://localhost:9000/buscar', {tabla: this.opcion}).subscribe((res:any) => {
      this.registros = res.data
    })
    this.pagina_actual = 0;
  }

  get_pagina_anterior() {
    if (this.pagina_actual != 0) {
      this.pagina_actual -= 1
      this.indice_inicio -= 10;
    }
  }

  get_pagina_posterior() {
    let indice_reg_final = 10 *(this.pagina_actual + 1)
    if (this.registros.length - indice_reg_final > 0) {
      this.pagina_actual += 1;
      this.indice_inicio += 10;
    }
  }


}
