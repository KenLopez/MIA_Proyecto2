import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  opcion = "None"
  registro: any = null

  // Para equipo 
  nombre_equipo = ""
  pais_equipo = ""

  // Para jugador
  nombre_jugador = ""

  // Director
  nombre_director = ""


  // Estadio
  nombre_estadio = ""
  pais_estadio = ""

  // Competicion
  nombre_competicion = ""
  pais_competicion = ""

  // Partido
  fecha_partido = ""

  // Usuario
  nombre_usuario = ""
  contrasenia_usuario = ""
  descripcion_usuario = ""
  usuario = ""


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }



  set_opcion_tabla(opcion: string) {
    this.opcion = opcion
  }

  get_equpipo() {
    let peticion = {
      nombre: this.nombre_equipo,
      pais: this.pais_equipo
    }
    this.http.post<any>('http://localhost:9000/selectEquipo', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se encontro el equipo")
        return;
      }
      this.registro = res.data;
    })
  }

  modificar_equipo() {
    let peticion = {
      nombre: this.nombre_equipo,
      pais: this.pais_equipo,
      nombre2: this.registro.NOMBRE,
      pais2: this.registro.PAIS,
      fecha_fun: this.registro.FECHA_FUN,
      foto: this.registro.FOTO_LOGO,
    }
    this.http.post<any>('http://localhost:9000/modificarEquipo', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se pudo modifcar el equipo.")
        return;
      } else {
        alert("Se ha modificado el equipo.")
      }
    })
  }

  get_jugador() {
    let peticion = {
      nombre: this.nombre_jugador,
    }
    this.http.post<any>('http://localhost:9000/selectJugador', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se encontro el jugador")
        return;
      }
      this.registro = res.data;
    })
  }


  modificar_jugador() {
    let peticion = {
      nombre: this.nombre_jugador,
      nombre2: this.registro.NOMBRE,
      fecha_nac: this.registro.FECHA_NAC,
      nacionalidad: this.registro.NACIONALIDAD,
      posicion: this.registro.POSICION,
      idEquipo: this.registro.IDEQUIPO,
      
    }
    this.http.post<any>('http://localhost:9000/modificarJugador', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se pudo modifcar el jugador.")
        return;
      } else {
        alert("Se ha modificado el jugador.")
      }
    })
  }

  
  get_director() {
    let peticion = {
      nombre: this.nombre_director,
    }
    this.http.post<any>('http://localhost:9000/selectDirector_tecnico', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se encontro el director")
        return;
      }
      this.registro = res.data;
    })
  }

  modificar_director() {
    let peticion = {
      nombre: this.nombre_director,
      nombre2: this.registro.NOMBRE,
      fecha_nac: this.registro.FECHA_NAC,
      pais: this.registro.PAIS,
      nacionalidad: this.registro.NACIONALIDAD,
      estado: this.registro.ESTADO,
      foto: this.registro.FOTO,
    }
    this.http.post<any>('http://localhost:9000/modificarDirector_tecnico', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se pudo modifcar el director.")
        return;
      } else {
        alert("Se ha modificado el director.")
      }
    })
  }



  get_estadio() {
    let peticion = {
      nombre: this.nombre_estadio,
      pais: this.pais_estadio
    }
    this.http.post<any>('http://localhost:9000/selectEstadio', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se encontro el estadio")
        return;
      }
      this.registro = res.data;
    })
  }

  modificar_estadio() {
    let peticion = {
      nombre: this.nombre_estadio,
      pais: this.pais_estadio,
      pais2: this.registro.PAIS,
      nombre2: this.registro.NOMBRE,
      fecha_ing: this.registro.FECHA_ING,
      capacidad: this.registro.CAPACIDAD,
      direccion: this.registro.DIRECCION,
      estado: this.registro.ESTADO,
      foto: this.registro.FOTO,
    }
    this.http.post<any>('http://localhost:9000/modificarEstadio', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se pudo modifcar el estadio.")
        return;
      } else {
        alert("Se ha modificado el estadio.")
      }
    })
  }



  get_competicion() {
    let peticion = {
      nombre: this.nombre_competicion,
      pais: this.pais_competicion
    }
    this.http.post<any>('http://localhost:9000/selectCompeticion', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se encontro la competicion")
        return;
      }
      this.registro = res.data;
      //this.registro.ANIO = res.data.AÑO;
    })
  }

  modificar_competicion() {
    let peticion = {
      nombre: this.nombre_competicion,
      pais: this.pais_competicion,
      nombre2: this.registro.NOMBRE,
      anio: this.registro.ANIO,
      tipo: this.registro.TIPO,
      pais2: this.registro.PAIS,

    }
    this.http.post<any>('http://localhost:9000/modificarCompeticion', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se pudo modifcar la competicion.")
        return;
      } else {
        alert("Se ha modificado la competicion.")
      }
    })
  }

  

  get_partido() {
    let peticion = {
      fecha: this.fecha_partido,
    }
    this.http.post<any>('http://localhost:9000/selectPartido', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se encontro el partido")
        return;
      }
      this.registro = res.data;
    })
  }


  modificar_partido() {
    let peticion = {
      fecha: this.fecha_partido,
      fecha2: this.registro.FECHA,
      idEstadio: this.registro.IDESTADIO,
      estado: this.registro.ESTADO,
      idpartido_incidencia: this.registro.IDPARTIDO_INCIDENCIA,
      equipo_local: this.registro.EQUIPO_LOCAL,
      equipo_visita: this.registro.EQUIPO_VISITA,
      resultado: this.registro.RESULTADO,

    }
    this.http.post<any>('http://localhost:9000/modificarPartido', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se pudo modifcar el partido.")
        return;
      } else {
        alert("Se ha modificado el partido.")
      }
    })
  }
  


  get_usuario() {
    let peticion = {
      nombre: this.nombre_usuario,  
      usuario: this.usuario,
      contrasenia: this.contrasenia_usuario
    }
    this.http.post<any>('http://localhost:9000/getUsuario', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se encontro el usuario")
        return;
      }
      this.registro = res.data;
    })
  }


  modificar_usaruio(id: string) {
    let d = new Date();
    let fecha = d.getDate() + "/" + (d.getMonth()+1)+ "/" +d.getFullYear();
    let peticion = {
      idUsuario: id,
      nombre: this.registro.NOMBRE,
      clave_de_acceso: this.registro.CLAVE_DE_ACCESO,
      telefono: this.registro.TELEFONO,
      genero: this.registro.GENERO,
      cant_mem: this.registro.CANT_MEM,
      cant_din: this.registro.CANT_DIN,
      estado: this.registro.ESTADO,
      pais: this.registro.PAIS,
      tipo: this.registro.TIPO,
      fecha_admin: fecha,
      descripcion: this.descripcion_usuario,
      id_admin: JSON.parse(localStorage.getItem('usuario')!).IDUSUARIO,
    }
    this.http.post<any>('http://localhost:9000/modificaUsuario', peticion).subscribe(res => {
      if (res.estado == false) {
        alert("No se pudo modifcar el usuario.")
        return;
      } else {
        alert("Se ha modificado el usuario.")
      }
    })
  }




}
 