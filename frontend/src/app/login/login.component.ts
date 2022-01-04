import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/users.service';
import { faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Login } from '../models/login';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

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
      CLAVE: [null, Validators.required],
      CORREO: [null, Validators.required],
      VISIBLE: [false]
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
      this.error = "";
      let n = <Login>this.form.getRawValue();
      let res:User = <User>(await this.userService.login(n));
      this.formBlockUI.stop();
      var url;
      switch (res.TIPO) {
        case 'N':
          url = `/cliente`
          break;
        case 'P':
          url = `/premium`
          break;
        case 'A':
          url = `/admin`
          break;
        case 'E':
          url = `/empleado`
          break;
        default:
          url = '/'
          break;
      }
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate([`${url}/${res.ID}`]);
    }catch(e:any){
      this.formBlockUI.stop();
      this.error = e.error;
    }
  }

  toggleVisibility(){
    this.form.patchValue({
      VISIBLE: !this.f["VISIBLE"].value
    });
    this.form.updateValueAndValidity();
  }
}
