import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styles: [
  ]
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
  ) { 
    localStorage.clear();
  }

  public token = this.route.snapshot.paramMap.get('token')?.toString();

  ngOnInit(): void {
    this.confirm();
  }

  async confirm(){
    try{
      let res:User = <User>(await this.userService.confirm({TOKEN: this.token?this.token:""}));
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
    }catch(e){
      this.router.navigate(['/login']);
    }
  }

}
