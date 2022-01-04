import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emailed',
  templateUrl: './emailed.component.html',
  styles: [
  ]
})
export class EmailedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  public correo = this.route.snapshot.paramMap.get('email')?.toString();

  ngOnInit(): void {

  }

}
