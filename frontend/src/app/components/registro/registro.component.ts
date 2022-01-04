import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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
    tipo: "usuario"
  }

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  registrarse() {
    this.http.post<any>('http://localhost:9000/insertUsuario', this.info).subscribe(res => {
      if (res.status == true) {
        this.router.navigate(['/login'])
      } else {
        alert("No se pudo registrar el usuario, compruebe los campos.")
      }
    })
  }

}
