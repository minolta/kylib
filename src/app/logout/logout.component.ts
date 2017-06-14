import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  msg: string;
  constructor(public auth: AuthService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.params.subscribe(d => {
      console.log(d);
    })
    let info = this.auth.info();

    this.msg = info.sub;
    this.auth.logout();
  }

}
