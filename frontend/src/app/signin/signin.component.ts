import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/users.service';
import { faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  @BlockUI("form-section") formBlockUI: NgBlockUI;

  public faCalendar = faCalendar;
  public faEye = faEye;
  public submitted = false;
  public error = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    localStorage.clear();
  }

  public form: FormGroup = new FormGroup({});

  get f(){
    return this.form.controls;
  }


  ngOnInit(): void {
    this.buildForm();
    this.getData();
  }

  async getData(){}

  buildForm(){
    this.form = this.formBuilder.group({
      NOMBRE: [null, Validators.required],
      APELLIDOS: [null, Validators.required],
      CLAVE: [null, Validators.required],
      CLAVE2: [null, Validators.required],
      CORREO: [null, Validators.required],
      TELEFONO: [null],
      GENERO: ['H'],
      FECHA_NAC: [null, Validators.required],
      DIRECCION: [null, Validators.required],
      PAIS: [null, Validators.required],
      TIPO: ['N'],
      FOTO: [null],
      VISIBLE: [false],
      VISIBLE2: [false],
    });
  }

  async submit(){
    this.submitted = true;
    if(this.form.invalid){
      this.submitted;
      return;
    }
    try{
      this.formBlockUI.start();
      let n = <User>this.form.getRawValue();
      const fecha = this.f["FECHA_NAC"].value;
      n.FECHA_NAC = `${fecha.year}/${fecha.month<10?'0':''}${fecha.month}/${fecha.day<10?'0':''}${fecha.day}`
      await this.userService.newUser(n);
      this.formBlockUI.stop();
      this.router.navigate([`./emailed/${n.CORREO}`]);
    }catch(e:any){
      console.log(e);
      this.error = e.error;
      this.formBlockUI.stop();
      
    }
  }

  toggleVisibility(control: number){
    let c = control
    ? {VISIBLE: !this.f["VISIBLE"].value}
    : {VISIBLE2: !this.f["VISIBLE2"].value};
    this.form.patchValue(c);
    this.form.updateValueAndValidity();
  }

}
