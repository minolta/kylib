import { MdSnackBar } from '@angular/material';
import { Logininfo } from './../logininfo';
import { TargetHostConfig } from './../kconfig';
import { UserService } from './../user.service';
import { User } from './../user';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: string;
  password: string;
  constructor(private bar: MdSnackBar, public us: UserService, private http: Http, public tgh: TargetHostConfig, private router: Router, ) { }

  ngOnInit() {
  }

  login() {
    localStorage.removeItem('token');
    let u: User = { login: this.user, password: this.password };
    let url = this.us.host + '/login';
    console.log('URL:' + url);
    let lo: Logininfo = { user: u };

    console.log('For send : '+JSON.stringify(lo));
    this.http.post(url, lo).subscribe(d => {
      console.log('D:' + JSON.stringify(d));
      let re: Logininfo = d.json();
      localStorage.setItem('token', re.token);
      this.router.navigate(['/home']);

    }, e => {
      this.bar.open('Login error', ' ' + e ,{duration:7000});
      console.log(e);
      

    })
  }
}
