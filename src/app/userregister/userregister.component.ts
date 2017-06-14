import { UserService } from './../user.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {
  user: User = {};
  constructor(public us: UserService, public bar: MdSnackBar) { }

  ngOnInit() {
  }
  register() {
    this.us.register(this.user).subscribe(d => {
      this.bar.open('New user', '' + d, { duration: 5000 });
    });
  }
}
