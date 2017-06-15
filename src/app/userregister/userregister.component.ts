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
    if (!this.checkpassword(this.user.password, this.user.repassword)) {
      this.bar.open('Password not same', 'Error', { duration: 15000 });
      return;
    }
    this.us.register(this.user).subscribe(d => {
      this.bar.open('New user', '' + JSON.stringify(d), { duration: 5000 });
      this.user = {};
    });
  }

  checkpassword(p: string, p2: string) {

    if (p === p2)
      return true;
    return false;
  }
}
