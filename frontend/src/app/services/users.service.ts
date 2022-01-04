import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Login, Confirmation } from '../models/models';
import { api } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(){
    return this.http.get(`${api}users`).toPromise();
  }

  newUser(user: User){
    return this.http.post(`${api}register`, user).toPromise();
  }

  login(user: Login){
    return this.http.post(`${api}login`, user).toPromise();
  }

  confirm(token: Confirmation){
    return this.http.put(`${api}login`, token).toPromise();
  }
}
