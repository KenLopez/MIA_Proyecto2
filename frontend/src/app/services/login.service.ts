import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  iniciarSesion(nombre: string, contrasena: string):Observable<any> {
    const usuarioJson = {
      usuario: nombre,
      password: contrasena
    }
    return this.http.post<any>('http://localhost:9000/loginAdmin', usuarioJson)
  }

  


}

export default LoginService 