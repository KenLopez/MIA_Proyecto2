import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let id = this.route.snapshot.paramMap.get('id');
    if(!user || Number(id) != (<User>JSON.parse(user)).ID){
      this.router.navigate(['/login']);
    }
  }

}
