import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {


  info = {
    nombre: "",
    usuario: "",
    contrasenia: "",
    correo: "",
    telefono: "",
    foto: "",
    genero: "",
    fecha_nac: "",
    fecha_reg: "",
    direccion: "",
    pais: "",
    membresia: "0",
    tipo: ""
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  agregar() {
    this.http.post<any>('http://localhost:9000/insertUsuario', this.info).subscribe(res => {
      if (res.status != true) {
        alert("No se pudo registrar el usuario, compruebe los campos.")
      } else {
        alert("Se ha insertado usuario.")
      }
    })
  }

}
