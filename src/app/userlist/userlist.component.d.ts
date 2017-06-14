import { UserService } from './../user.service';
import { JwtHelper } from 'angular2-jwt';
import { OnInit } from '@angular/core';
export declare class UserlistComponent implements OnInit {
    us: UserService;
    users: Array<any>;
    jwtHelper: JwtHelper;
    constructor(us: UserService);
    ngOnInit(): void;
}
