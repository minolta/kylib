import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AdmingradService implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate() {
        if (this.auth.admin()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}