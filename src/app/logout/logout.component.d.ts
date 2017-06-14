import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { OnInit } from '@angular/core';
export declare class LogoutComponent implements OnInit {
    auth: AuthService;
    private route;
    msg: string;
    constructor(auth: AuthService, route: ActivatedRoute);
    ngOnInit(): void;
}
