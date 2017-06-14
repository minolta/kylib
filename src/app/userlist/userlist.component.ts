import { UserService } from './../user.service';
import { JwtHelper } from 'angular2-jwt';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: Array<any>;
  jwtHelper = new JwtHelper();
  constructor(public us: UserService) { }

  ngOnInit() {
    this.us.lists().subscribe(d => {
      this.users = d;
    })
  }

}
