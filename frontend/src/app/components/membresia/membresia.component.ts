import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  info_sucripcion = {
    fecha: "",
    id: "",
    equipo: "",
    tarjeta: ""
  }

  ngOnInit(): void {
  }


  subscribirse() {
    let d = new Date();
    this.info_sucripcion.fecha = d.getDate() + "/" + (d.getMonth()+1)+ "/" +d.getFullYear();
    this.info_sucripcion.id = JSON.parse(localStorage.getItem('usuario')!).IDUSUARIO;
    this.http.post<any>('http://localhost:9000/insertMembresia', this.info_sucripcion).subscribe((res:any) => {
      if (res.status == true) {
        let usuario = JSON.parse(localStorage.getItem('usuario')!);
        usuario.CANT_MEM += 1;
        usuario.MEMBRESIA = 1;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert("Usted ha adquirido su membresia.")
      } else {
        alert("No se pudo adquirir membresia.")
      }
    })
  }

}
