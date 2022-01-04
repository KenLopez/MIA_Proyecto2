import { Component, OnInit } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import LoginService from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre:string = ""
  contrasena:string  = ""

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

    iniciarSesion() {
    this.loginService.iniciarSesion(this.nombre, this.contrasena).subscribe( (res:any) => {
      if (res.correcto == true) {
        localStorage.setItem('usuario', JSON.stringify(res.usuario))
        this.router.navigate(['/inicio/']);
      } else {
        alert("error")
      }
    })

  }


}
