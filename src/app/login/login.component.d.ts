import { UserService } from './../user.service';
import { TargetHostConfig } from './../../kconfig';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { OnInit } from '@angular/core';
export declare class LoginComponent implements OnInit {
    us: UserService;
    private http;
    tgh: TargetHostConfig;
    private router;
    user: string;
    password: string;
    constructor(us: UserService, http: Http, tgh: TargetHostConfig, router: Router);
    ngOnInit(): void;
    login(): void;
}
