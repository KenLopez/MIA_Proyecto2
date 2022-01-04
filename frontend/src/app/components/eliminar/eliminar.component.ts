import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  opcion = "";
  registros: any[] = []
  pagina_actual = 0
  indice_inicio = 0

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  set_opcion_tabla(opcion: string) {
    this.opcion = opcion
    this.http.post<any>('http://localhost:9000/buscar', {tabla: this.opcion}).subscribe(res => {
      this.registros = res.data
    })
    this.pagina_actual = 0;
  }


  async eliminar_registro(id: number, indice: number) {
    let se_elimino = false
    this.http.post<any>('http://localhost:9000/eliminar', {tabla: this.opcion, indice: id}).subscribe(res => {
        if (res.estado == true) {
          this.registros.splice(indice, 1);
          alert("Se elimino registro.")
        } else {
          alert("No se pudo eliminar el registro.")
        }
    })

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

