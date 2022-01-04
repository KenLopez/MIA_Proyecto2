import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario_origial:any = {}
  info_usuario:any = {}

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.usuario_origial = JSON.parse(localStorage.getItem('usuario')!);
    this.info_usuario = this.usuario_origial;
    console.log(this.usuario_origial)
  }

  modificar() {
    let cuerpo_peticion = {
      IDUSUARIO: this.usuario_origial.IDUSUARIO,
      NOMBRE: this.info_usuario.NOMBRE,
      USUARIO: this.info_usuario.USUARIO,
      CLAVE_DE_ACCESO: this.info_usuario.CLAVE_DE_ACCESO,
      TELEFONO: this.info_usuario.TELEFONO,
      FOTOGRAFIA: this.info_usuario.FOTOGRAFIA,
      GENERO: this.info_usuario.GENERO,
      FECHA_DE_NACIMIENTO: this.info_usuario.FECHA_DE_NACIMIENTO,
      DIRECCION: this.info_usuario.DIRECCION,
      PAIS: this.info_usuario.PAIS,
    }

    this.http.post<any>('http://localhost:9000/modificaUsuario', cuerpo_peticion).subscribe(res => {
      alert("Se ha actualizado tu perfil.")
      localStorage.setItem('usuario', JSON.stringify(this.info_usuario))
    })
  }

}
